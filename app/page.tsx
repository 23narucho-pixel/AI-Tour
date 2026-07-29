"use client";

import { useMemo, useState } from "react";

type Criterion = "시간" | "비용" | "안전" | "환경" | "편리성";

type Scenario = {
  id: number;
  icon: string;
  group: string;
  title: string;
  route: string;
  mission: string;
  color: string;
  recommendation: {
    transport: string;
    summary: string;
    route: string[];
    time: string;
    cost: string;
    reason: string;
    caution: string;
  };
};

const scenarios: Scenario[] = [
  {
    id: 1,
    icon: "🏛️",
    group: "1모둠",
    title: "박물관 체험학습",
    route: "세종 → 서울",
    mission: "친구들과 안전하고 알차게 박물관으로 이동해요.",
    color: "coral",
    recommendation: {
      transport: "BRT + KTX + 지하철",
      summary: "빠르고 많은 학생이 함께 움직이기 좋은 대중교통 조합이에요.",
      route: ["학교에서 BRT 탑승", "오송역에서 KTX", "서울역에서 지하철", "박물관 도착"],
      time: "약 2시간 10분",
      cost: "1인 약 18,000원",
      reason: "교통 체증을 피할 수 있고, 단체로 이동 경로를 확인하기 쉬워요.",
      caution: "환승할 때 인원 확인이 필요하고, 출발 전에 단체 승차권을 예약해야 해요.",
    },
  },
  {
    id: 2,
    icon: "🏝️",
    group: "2모둠",
    title: "제주 가족 여행",
    route: "세종 → 제주",
    mission: "가족 모두가 즐거운 제주 여행길을 찾아요.",
    color: "yellow",
    recommendation: {
      transport: "승용차 + 비행기 + 렌터카",
      summary: "이동 시간이 짧고 제주 안에서도 자유롭게 움직일 수 있어요.",
      route: ["청주공항까지 승용차", "제주행 비행기", "공항에서 렌터카", "숙소 도착"],
      time: "약 3시간 30분",
      cost: "4인 약 45만 원",
      reason: "배보다 빠르고, 어린이나 짐이 있어도 비교적 편리해요.",
      caution: "항공료는 날짜에 따라 달라지고, 비행기가 날씨의 영향을 받을 수 있어요.",
    },
  },
  {
    id: 3,
    icon: "🚁",
    group: "3모둠",
    title: "섬 응급환자 이송",
    route: "섬 → 큰 병원",
    mission: "환자를 가장 빠르고 안전하게 큰 병원으로 옮겨요.",
    color: "red",
    recommendation: {
      transport: "구급 헬기",
      summary: "응급 의료진과 함께 가장 빠르게 병원으로 이동할 수 있어요.",
      route: ["119에 신고", "섬 착륙장으로 이송", "구급 헬기 탑승", "권역응급의료센터 도착"],
      time: "약 40분~1시간",
      cost: "공공 응급의료 체계 확인",
      reason: "배보다 빠르고 이동 중에도 응급 처치를 계속할 수 있어요.",
      caution: "날씨와 착륙 장소를 확인해야 하며, 실제 상황에서는 반드시 119의 지시를 따라요.",
    },
  },
  {
    id: 4,
    icon: "🚢",
    group: "4모둠",
    title: "대량 화물 운송",
    route: "부산 → 제주",
    mission: "많은 물건을 안전하고 알맞은 비용으로 운반해요.",
    color: "blue",
    recommendation: {
      transport: "화물차 + 화물선",
      summary: "많은 양의 물건을 한 번에 실을 수 있어 비용을 줄이기 좋아요.",
      route: ["부산 창고에서 화물차 적재", "부산항 이동", "화물선 선적", "제주항에서 배송"],
      time: "약 12~16시간",
      cost: "화물 크기·무게에 따라 견적",
      reason: "비행기보다 부피와 무게 제한이 적고 대량 운송에 알맞아요.",
      caution: "파도가 높으면 지연될 수 있고, 물건이 흔들리지 않도록 포장해야 해요.",
    },
  },
  {
    id: 5,
    icon: "🚲",
    group: "5모둠",
    title: "혼잡 시간 공원 이동",
    route: "학교 → 가까운 공원",
    mission: "막히는 길에서도 편리하고 환경을 생각하며 이동해요.",
    color: "green",
    recommendation: {
      transport: "도보 또는 자전거",
      summary: "가까운 거리는 자동차보다 빠를 수 있고 탄소 배출도 적어요.",
      route: ["안전한 골목길 확인", "횡단보도 이용", "자전거도로 따라 이동", "공원 도착"],
      time: "도보 20분 / 자전거 8분",
      cost: "무료",
      reason: "교통 체증의 영향을 받지 않고 건강과 환경에도 좋아요.",
      caution: "헬멧을 쓰고, 비가 오거나 어두울 때는 도보나 버스를 선택해요.",
    },
  },
];

const criteria: { name: Criterion; icon: string; prompt: string }[] = [
  { name: "시간", icon: "⏱️", prompt: "예상 시간이 상황에 알맞나요?" },
  { name: "비용", icon: "💰", prompt: "비용이 합리적이고 정확한가요?" },
  { name: "안전", icon: "🛡️", prompt: "위험 요소와 안전 수칙이 있나요?" },
  { name: "환경", icon: "🌱", prompt: "환경에 미치는 영향은 어떤가요?" },
  { name: "편리성", icon: "✨", prompt: "함께 이동하기 편리한가요?" },
];

const emptyRatings = (): Record<Criterion, number> => ({
  시간: 0,
  비용: 0,
  안전: 0,
  환경: 0,
  편리성: 0,
});

export default function Home() {
  const [selectedId, setSelectedId] = useState(1);
  const [ratings, setRatings] = useState<Record<Criterion, number>>(emptyRatings);
  const [review, setReview] = useState("");
  const [revision, setRevision] = useState("");
  const [teamName, setTeamName] = useState("반짝이는 수송 탐험대");
  const [completed, setCompleted] = useState(false);

  const selected = scenarios.find((item) => item.id === selectedId) ?? scenarios[0];
  const ratedCount = Object.values(ratings).filter(Boolean).length;
  const progress = Math.min(100, 20 + ratedCount * 8 + (review.trim() ? 15 : 0) + (revision.trim() ? 20 : 0) + (completed ? 5 : 0));
  const average = useMemo(() => {
    const values = Object.values(ratings).filter(Boolean);
    return values.length ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1) : "0.0";
  }, [ratings]);

  const changeScenario = (id: number) => {
    setSelectedId(id);
    setRatings(emptyRatings());
    setReview("");
    setRevision("");
    setCompleted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="맨 위로 이동">
            <span className="brand-mark">🧭</span>
            <span><b>AI 여행 상담소</b><small>생활과 수송 · 활동 2</small></span>
          </button>
          <div className="header-actions">
            <span className="class-badge">초등 5학년</span>
            <button className="guide-button" onClick={() => scrollTo("guide")}>활동 안내</button>
          </div>
        </div>
        <div className="progress-wrap" aria-label={`활동 진행률 ${progress}%`}>
          <div className="progress-label"><span>나의 활동 진행률</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">🚦 AI의 생각을 살펴보고 더 좋은 방법을 찾아봐요!</span>
            <h1>오늘은 우리가<br /><em>여행 상담가!</em></h1>
            <p>이동 상황을 고르고, AI 추천을 꼼꼼히 검토한 뒤<br className="desktop-break" /> 우리 모둠만의 멋진 이동 계획을 완성해요.</p>
            <button className="primary-button" onClick={() => scrollTo("scenarios")}>상황 고르러 가기 <span>↓</span></button>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="float-card card-map">🗺️</span>
            <span className="float-card card-bus">🚌</span>
            <span className="float-card card-plane">✈️</span>
            <div className="robot">
              <span className="robot-antenna">✦</span>
              <div className="robot-face"><i /><i /><b>◡</b></div>
              <div className="robot-body">AI</div>
            </div>
          </div>
        </section>

        <section className="section scenario-section" id="scenarios">
          <div className="section-heading">
            <span className="step-number">1</span>
            <div><p>STEP 1</p><h2>우리 모둠의 여행 상황을 골라요</h2></div>
          </div>
          <div className="scenario-grid">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`scenario-card ${scenario.color} ${scenario.id === selectedId ? "selected" : ""}`}
                onClick={() => changeScenario(scenario.id)}
                aria-pressed={scenario.id === selectedId}
              >
                <span className="group-chip">{scenario.group}</span>
                <span className="scenario-icon">{scenario.icon}</span>
                <strong>{scenario.title}</strong>
                <b>{scenario.route}</b>
                <small>{scenario.mission}</small>
                <span className="select-state">{scenario.id === selectedId ? "✓ 선택했어요" : "선택하기"}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section recommendation-section" id="recommendation">
          <div className="section-heading">
            <span className="step-number blue">2</span>
            <div><p>STEP 2</p><h2>AI 상담사의 추천을 확인해요</h2></div>
          </div>
          <div className="recommendation-card">
            <div className="recommendation-top">
              <div className="ai-avatar">AI</div>
              <div>
                <span className="answer-label">AI 추천 답변</span>
                <h3>{selected.group}에는 <em>{selected.recommendation.transport}</em>을 추천해요!</h3>
                <p>{selected.recommendation.summary}</p>
              </div>
            </div>
            <div className="route-line">
              {selected.recommendation.route.map((item, index) => (
                <div className="route-stop" key={item}>
                  <span>{index + 1}</span><b>{item}</b>
                  {index < selected.recommendation.route.length - 1 && <i>→</i>}
                </div>
              ))}
            </div>
            <div className="fact-grid">
              <article><span>⏱️</span><div><small>예상 시간</small><strong>{selected.recommendation.time}</strong></div></article>
              <article><span>💰</span><div><small>예상 비용</small><strong>{selected.recommendation.cost}</strong></div></article>
              <article className="wide"><span>💡</span><div><small>추천한 까닭</small><strong>{selected.recommendation.reason}</strong></div></article>
            </div>
            <div className="caution"><span>🔎</span><p><b>꼭 확인해요!</b>{selected.recommendation.caution}</p></div>
          </div>
        </section>

        <section className="section review-section" id="review">
          <div className="section-heading">
            <span className="step-number green">3</span>
            <div><p>STEP 3</p><h2>AI 추천을 비판적으로 살펴봐요</h2></div>
          </div>
          <div className="review-layout">
            <div className="criteria-panel">
              <div className="panel-title"><span>🕵️</span><div><h3>꼼꼼 탐정의 평가표</h3><p>별을 눌러 각 항목을 평가해 보세요.</p></div></div>
              {criteria.map((criterion) => (
                <div className="criterion" key={criterion.name}>
                  <div className="criterion-copy"><span>{criterion.icon}</span><div><b>{criterion.name}</b><small>{criterion.prompt}</small></div></div>
                  <div className="stars" aria-label={`${criterion.name} 평가`}>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => setRatings({ ...ratings, [criterion.name]: score })}
                        aria-label={`${criterion.name} ${score}점`}
                        className={ratings[criterion.name] >= score ? "active" : ""}
                      >★</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="score-summary"><span>우리 모둠의 AI 추천 점수</span><strong>{average} <small>/ 5.0</small></strong></div>
            </div>
            <div className="notes-panel">
              <label htmlFor="review-note"><span>💬</span> 우리가 발견한 점</label>
              <p>AI가 잘 생각한 점, 빠뜨린 점, 실제와 다를 수 있는 점을 적어 보세요.</p>
              <textarea
                id="review-note"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="예) 단체로 이동할 때 학생 수를 고려하지 않았어요. 실제 기차 시간과 비용도 지도 앱에서 확인해야 해요."
                maxLength={350}
              />
              <small className="char-count">{review.length} / 350자</small>
              <div className="thinking-tips">
                <b>생각 열기 질문</b>
                <span>정보는 믿을 만한가요?</span><span>다른 이동 방법은 없나요?</span><span>누구에게나 좋은 방법인가요?</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section revision-section" id="revision">
          <div className="section-heading">
            <span className="step-number yellow">4</span>
            <div><p>STEP 4</p><h2>우리 모둠의 수정안을 만들어요</h2></div>
          </div>
          <div className="revision-card">
            <div className="revision-intro">
              <span>🛠️</span>
              <div><h3>AI 추천, 이렇게 바꿔 볼래요!</h3><p>검토한 내용을 바탕으로 더 안전하고 알맞은 방법을 제안해 보세요.</p></div>
            </div>
            <textarea
              value={revision}
              onChange={(event) => setRevision(event.target.value)}
              placeholder={`예) ${selected.recommendation.transport}을 이용하되, 출발 전 실제 시간표를 확인하고 안전 담당 친구를 정해요. 비용을 줄이기 위해 단체 할인이 있는지도 알아봐요.`}
              maxLength={500}
            />
            <div className="revision-bottom"><span>{revision.length} / 500자</span><button onClick={() => scrollTo("final-card")}>발표 카드 미리 보기 →</button></div>
          </div>
        </section>

        <section className="section final-section" id="final-card">
          <div className="section-heading centered">
            <span className="step-number purple">5</span>
            <div><p>STEP 5</p><h2>최종 이동 계획을 발표해요!</h2></div>
          </div>
          <div className="presentation-card">
            <div className="presentation-ribbon">우리 모둠의 최종 선택</div>
            <div className="presentation-head">
              <span>{selected.icon}</span>
              <div><small>{selected.group} · {selected.route}</small><h3>{selected.title}</h3></div>
              <div className="score-bubble"><small>AI 평가</small><b>{average}</b></div>
            </div>
            <div className="presentation-body">
              <div className="plan-transport"><small>선택한 이동수단</small><strong>{selected.recommendation.transport}</strong></div>
              <div className="plan-columns">
                <article><span>🔍</span><div><small>AI 추천에서 발견한 점</small><p>{review || "STEP 3에서 우리 모둠의 생각을 적으면 여기에 나타나요."}</p></div></article>
                <article><span>🌟</span><div><small>우리 모둠의 최종 수정안</small><p>{revision || "STEP 4에서 더 좋은 이동 계획을 적으면 여기에 나타나요."}</p></div></article>
              </div>
              <label className="team-name">발표 모둠 이름 <input value={teamName} onChange={(event) => setTeamName(event.target.value)} maxLength={24} /></label>
            </div>
            <div className="presentation-footer"><span>🧭 {teamName}</span><b>AI의 답을 그대로 믿지 않고, 우리가 직접 판단했어요!</b></div>
          </div>
          <button
            className={`finish-button ${completed ? "done" : ""}`}
            onClick={() => setCompleted(!completed)}
            disabled={!review.trim() || !revision.trim() || ratedCount < 5}
          >
            {completed ? "✓ 활동을 멋지게 완료했어요!" : ratedCount < 5 ? "평가표의 별을 모두 선택해 주세요" : !review.trim() || !revision.trim() ? "발견한 점과 수정안을 작성해 주세요" : "🎉 활동 완료하기"}
          </button>
        </section>

        <section className="guide-section" id="guide">
          <div><span>💡</span><h2>AI와 함께할 때 기억해요</h2></div>
          <ul>
            <li><b>확인하기</b><span>AI의 정보가 실제로 맞는지 지도와 자료로 확인해요.</span></li>
            <li><b>비교하기</b><span>시간, 비용, 안전, 환경, 편리성을 골고루 살펴봐요.</span></li>
            <li><b>판단하기</b><span>마지막 선택과 결정은 우리가 직접 해요.</span></li>
          </ul>
        </section>
      </main>

      <footer>
        <div><span className="brand-mark small">🧭</span><b>AI 여행 상담소</b></div>
        <p>초등학교 5학년 실과 · 생활과 수송</p>
        <small>규칙 기반 예시 자료이며, 실제 이동 전 최신 정보를 꼭 확인하세요.</small>
      </footer>
    </div>
  );
}
