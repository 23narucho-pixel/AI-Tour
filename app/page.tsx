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
  distance: string;
  transport: string;
  time: string;
  cost: string;
  color: string;
  stops: { icon: string; name: string; detail: string; duration: string }[];
  schedule: { time: string; title: string; detail: string }[];
  essentials: { icon: string; name: string; reason: string }[];
  safety: string[];
  eco: string[];
  alternatives: string[];
};

const scenarios: Scenario[] = [
  {
    id: 1, icon: "🏛️", group: "1모둠", title: "박물관 체험학습", route: "세종 → 서울",
    mission: "친구 24명과 선생님 2명이 안전하고 알차게 국립중앙박물관으로 이동해요.",
    distance: "약 145km", transport: "BRT + KTX + 지하철", time: "약 2시간 20분", cost: "1인 약 19,000원", color: "coral",
    stops: [
      { icon: "🏫", name: "학교", detail: "인원·준비물 확인", duration: "출발 08:00" },
      { icon: "🚌", name: "오송역", detail: "BRT 990번", duration: "35분" },
      { icon: "🚄", name: "서울역", detail: "KTX 단체석", duration: "55분" },
      { icon: "🚇", name: "이촌역", detail: "4호선 환승", duration: "22분" },
      { icon: "🏛️", name: "박물관", detail: "도보 10분", duration: "10:20 도착" },
    ],
    schedule: [
      { time: "07:40", title: "학교 집합", detail: "출석 확인, 모둠별 안전 약속 점검" },
      { time: "08:00", title: "BRT 출발", detail: "교통카드 준비, 두 줄로 차례 지키기" },
      { time: "08:50", title: "KTX 탑승", detail: "단체 승차권과 좌석 번호 확인" },
      { time: "10:20", title: "박물관 도착", detail: "물품 보관 후 해설 프로그램 참여" },
      { time: "15:30", title: "귀가 출발", detail: "인원 재확인, 같은 경로로 학교 복귀" },
    ],
    essentials: [
      { icon: "🎫", name: "단체 승차권", reason: "좌석을 함께 확보하고 비용을 줄여요." },
      { icon: "🪪", name: "학생증·비상 연락 카드", reason: "길을 잃었을 때 신원을 확인해요." },
      { icon: "💧", name: "물과 작은 간식", reason: "긴 이동 중 수분과 에너지를 보충해요." },
      { icon: "📝", name: "체험 활동지·필기구", reason: "전시 내용을 관찰하고 기록해요." },
      { icon: "🧢", name: "모둠 색 모자", reason: "붐비는 장소에서 친구를 쉽게 찾아요." },
      { icon: "🩹", name: "휴대용 구급함", reason: "찰과상과 멀미에 빠르게 대처해요." },
    ],
    safety: ["환승할 때마다 모둠장이 인원을 확인해요.", "승강장 안전선 안쪽에서 기다려요.", "친구와 떨어지면 움직이지 말고 교사에게 전화해요.", "교통약자 좌석과 통행로를 비워 두어요."],
    eco: ["일회용품 대신 개인 물병 사용", "26명이 버스 대신 철도를 이용해 탄소 배출 절감", "쓰레기는 되가져와 분리배출"],
    alternatives: ["전세버스: 환승은 없지만 교통 체증과 비용이 늘 수 있어요.", "시외버스: 저렴하지만 서울 안에서 추가 이동이 필요해요."],
  },
  {
    id: 2, icon: "🏝️", group: "2모둠", title: "제주 가족 여행", route: "세종 → 제주",
    mission: "어린이와 할머니를 포함한 5인 가족이 편안하고 즐겁게 제주로 이동해요.",
    distance: "약 430km", transport: "승용차 + 비행기 + 렌터카", time: "약 4시간", cost: "5인 약 58만 원", color: "yellow",
    stops: [
      { icon: "🏠", name: "세종 집", detail: "짐·예약 확인", duration: "출발 06:30" },
      { icon: "🚗", name: "청주공항", detail: "주차·수속", duration: "45분" },
      { icon: "✈️", name: "제주공항", detail: "항공 이동", duration: "1시간 10분" },
      { icon: "🚙", name: "렌터카", detail: "카시트 확인", duration: "40분" },
      { icon: "🏨", name: "숙소", detail: "해안도로 이동", duration: "11:00 도착" },
    ],
    schedule: [
      { time: "06:30", title: "집에서 출발", detail: "신분증과 예약 문자 최종 확인" },
      { time: "07:20", title: "공항 수속", detail: "짐 부치기, 할머니 이동 지원 요청" },
      { time: "09:00", title: "제주행 출발", detail: "기내 안전 수칙 확인" },
      { time: "10:40", title: "렌터카 인수", detail: "차량 외관·보험·카시트 점검" },
      { time: "11:30", title: "숙소 도착", detail: "휴식 후 가까운 관광지부터 방문" },
    ],
    essentials: [
      { icon: "🪪", name: "신분증·가족관계 서류", reason: "항공 탑승 신원을 확인해요." },
      { icon: "💊", name: "상비약·처방약", reason: "멀미와 갑작스러운 건강 변화에 대비해요." },
      { icon: "🧥", name: "바람막이·우산", reason: "제주의 빠른 날씨 변화에 대응해요." },
      { icon: "🔋", name: "충전기·보조 배터리", reason: "지도와 예약 정보를 계속 확인해요." },
      { icon: "🧴", name: "자외선 차단제", reason: "야외 활동 중 피부를 보호해요." },
      { icon: "🧸", name: "어린이 편안 용품", reason: "긴 대기와 이동 시간을 즐겁게 보내요." },
    ],
    safety: ["비행 전 기상과 결항 여부를 확인해요.", "렌터카 보험 범위와 카시트 고정을 점검해요.", "여행 일정을 가족 모두에게 공유해요.", "해안 절벽과 파도가 센 곳에서는 안전선을 지켜요."],
    eco: ["다회용 여행 용기 사용", "렌터카 이동 경로를 묶어 불필요한 주행 줄이기", "보호 지역의 식물과 돌을 가져오지 않기"],
    alternatives: ["배편: 자동차를 가져갈 수 있지만 시간이 오래 걸려요.", "공항 리무진: 렌터카보다 친환경적이지만 이동 자유가 줄어요."],
  },
  {
    id: 3, icon: "🚁", group: "3모둠", title: "섬 응급환자 이송", route: "섬 → 권역응급의료센터",
    mission: "섬의 응급환자를 의료진과 함께 가장 빠르고 안전하게 큰 병원으로 옮겨요.",
    distance: "약 85km", transport: "구급차 + 구급 헬기", time: "약 55분", cost: "공공 응급의료 체계", color: "red",
    stops: [
      { icon: "🏥", name: "보건지소", detail: "119 신고·처치", duration: "0분" },
      { icon: "🚑", name: "착륙장", detail: "구급차 이송", duration: "12분" },
      { icon: "🚁", name: "헬기 이동", detail: "의료진 동승", duration: "28분" },
      { icon: "🏢", name: "헬리패드", detail: "병원 인계", duration: "8분" },
      { icon: "🏥", name: "응급센터", detail: "정밀 치료", duration: "55분 내" },
    ],
    schedule: [
      { time: "00분", title: "119 신고", detail: "위치·증상·환자 상태를 정확히 전달" },
      { time: "05분", title: "응급 처치", detail: "119 지시에 따라 기도와 의식 확인" },
      { time: "15분", title: "착륙장 도착", detail: "주변 통제와 환자 인계 준비" },
      { time: "25분", title: "헬기 이륙", detail: "기상·착륙 가능 여부 최종 확인" },
      { time: "55분", title: "응급센터 인계", detail: "환자 기록과 투약 내용을 의료진에게 전달" },
    ],
    essentials: [
      { icon: "📋", name: "환자 기록지", reason: "증상과 처치 내용을 정확히 인계해요." },
      { icon: "💊", name: "복용 약 정보", reason: "약물 충돌과 알레르기를 예방해요." },
      { icon: "🪪", name: "신분·보호자 정보", reason: "병원 접수와 연락을 빠르게 해요." },
      { icon: "🧣", name: "보온 담요", reason: "이송 중 체온 저하를 막아요." },
      { icon: "📱", name: "충전된 휴대전화", reason: "119와 병원의 연락을 유지해요." },
      { icon: "🔦", name: "야간 신호 장비", reason: "어두운 착륙장 위치를 안전하게 알려요." },
    ],
    safety: ["실제 상황에서는 반드시 119 지시를 가장 먼저 따라요.", "헬기 착륙장에 일반인이 접근하지 않도록 통제해요.", "환자에게 음식이나 물을 함부로 주지 않아요.", "강풍·안개 시 해경선 등 대체 수단을 즉시 검토해요."],
    eco: ["응급 상황에서는 생명과 안전이 환경보다 우선", "불필요한 헬기 출동 방지를 위해 정확한 상태 전달", "의료 폐기물은 지정 용기에 처리"],
    alternatives: ["해경 경비함: 악천후 시 가능하지만 시간이 더 걸려요.", "응급 선박: 헬기 착륙이 불가능할 때 항구로 이송해요."],
  },
  {
    id: 4, icon: "🚢", group: "4모둠", title: "대량 화물 운송", route: "부산 → 제주",
    mission: "신선식품 10톤을 상하지 않게, 안전하고 알맞은 비용으로 운반해요.",
    distance: "약 300km", transport: "냉장 화물차 + 화물선", time: "약 14시간", cost: "약 230만 원", color: "blue",
    stops: [
      { icon: "🏭", name: "부산 창고", detail: "검수·냉장 적재", duration: "16:00" },
      { icon: "🚛", name: "부산항", detail: "봉인·계근", duration: "1시간" },
      { icon: "🚢", name: "해상 운송", detail: "온도 모니터링", duration: "11시간" },
      { icon: "⚓", name: "제주항", detail: "통관·하역", duration: "1시간" },
      { icon: "🏪", name: "물류센터", detail: "품질 검사", duration: "06:00" },
    ],
    schedule: [
      { time: "15:00", title: "상품 검수", detail: "수량·포장·유통기한 확인" },
      { time: "16:00", title: "냉장차 적재", detail: "품목별 적정 온도와 고정 상태 기록" },
      { time: "18:00", title: "화물선 선적", detail: "운송장·보험·차량 봉인 확인" },
      { time: "05:00", title: "제주항 하역", detail: "온도 기록과 파손 여부 점검" },
      { time: "06:00", title: "물류센터 인계", detail: "수령 확인서와 품질 검사 완료" },
    ],
    essentials: [
      { icon: "🌡️", name: "온도 기록 장치", reason: "운송 내내 냉장 상태를 증명해요." },
      { icon: "📦", name: "방수·완충 포장", reason: "습기와 흔들림으로부터 상품을 지켜요." },
      { icon: "🧾", name: "운송장·보험 서류", reason: "분실과 사고 발생 시 책임을 확인해요." },
      { icon: "🔒", name: "봉인 잠금 장치", reason: "운송 중 화물 훼손과 도난을 막아요." },
      { icon: "🪢", name: "고정 벨트·깔판", reason: "파도에도 화물이 움직이지 않게 해요." },
      { icon: "📡", name: "GPS 추적기", reason: "화물 위치와 도착 시간을 공유해요." },
    ],
    safety: ["중량 제한과 화물차 적재 기준을 지켜요.", "기상 악화 시 선박 출항 여부를 확인해요.", "화물은 무게 중심이 낮도록 균형 있게 고정해요.", "기사의 연속 운전 시간을 제한하고 충분히 쉬어요."],
    eco: ["빈 공간을 줄이는 공동 적재", "재사용 가능한 운송 상자와 팔레트 활용", "저속 운항과 최적 경로로 연료 절감"],
    alternatives: ["항공 화물: 매우 빠르지만 무겁고 큰 화물에는 비싸요.", "여객선 차량 선적: 소량 운송에는 편리하지만 공간이 제한돼요."],
  },
  {
    id: 5, icon: "🚲", group: "5모둠", title: "혼잡 시간 공원 이동", route: "학교 → 가까운 공원",
    mission: "학생 6명이 막히는 길에서도 안전하고 환경을 생각하며 공원으로 이동해요.",
    distance: "약 3.2km", transport: "자전거 + 도보", time: "약 18분", cost: "무료", color: "green",
    stops: [
      { icon: "🏫", name: "학교", detail: "자전거 점검", duration: "15:30" },
      { icon: "🚲", name: "자전거도로", detail: "일렬 주행", duration: "8분" },
      { icon: "🚦", name: "큰 횡단보도", detail: "내려서 건너기", duration: "3분" },
      { icon: "🌳", name: "생태 산책길", detail: "서행 구간", duration: "5분" },
      { icon: "🏞️", name: "공원", detail: "거치대 잠금", duration: "15:48" },
    ],
    schedule: [
      { time: "15:20", title: "안전 점검", detail: "브레이크·타이어·헬멧 끈 확인" },
      { time: "15:30", title: "학교 출발", detail: "안전 담당을 맨 앞과 뒤에 배치" },
      { time: "15:38", title: "횡단보도", detail: "자전거에서 내려 보행 신호에 건너기" },
      { time: "15:48", title: "공원 도착", detail: "자전거를 잠그고 인원 확인" },
      { time: "17:00", title: "귀가 출발", detail: "어두워지기 전 같은 안전 경로 이용" },
    ],
    essentials: [
      { icon: "⛑️", name: "자전거 헬멧", reason: "넘어질 때 머리를 보호해요." },
      { icon: "🦺", name: "밝은색 조끼", reason: "운전자에게 위치를 잘 보여 줘요." },
      { icon: "🔔", name: "벨·전조등", reason: "보행자에게 알리고 어두운 길을 밝혀요." },
      { icon: "🔒", name: "자전거 자물쇠", reason: "공원에서 안전하게 보관해요." },
      { icon: "💧", name: "개인 물병", reason: "운동 중 수분을 보충해요." },
      { icon: "🩹", name: "밴드·소독 티슈", reason: "작은 상처에 바로 대처해요." },
    ],
    safety: ["헬멧을 바르게 쓰고 한 줄로 주행해요.", "보행자 도로에서는 속도를 줄이거나 내려서 걸어요.", "이어폰과 휴대전화는 주행 중 사용하지 않아요.", "비가 오거나 어두우면 도보 또는 버스로 바꿔요."],
    eco: ["탄소 배출 없는 이동", "공원에서 일회용품 사용 줄이기", "야생 동식물을 건드리지 않고 흔적 남기지 않기"],
    alternatives: ["도보: 가장 안전하고 친환경적이지만 시간이 더 걸려요.", "시내버스: 날씨가 나쁠 때 편리하지만 혼잡할 수 있어요."],
  },
];

const criteria: { name: Criterion; icon: string; question: string }[] = [
  { name: "시간", icon: "⏱️", question: "예상 시간과 환승 여유가 충분한가요?" },
  { name: "비용", icon: "💰", question: "숨은 비용까지 고려했나요?" },
  { name: "안전", icon: "🛡️", question: "위험 요소와 대처법이 구체적인가요?" },
  { name: "환경", icon: "🌱", question: "탄소와 쓰레기를 줄일 수 있나요?" },
  { name: "편리성", icon: "✨", question: "모든 참여자가 편하게 이동할 수 있나요?" },
];

const emptyRatings = (): Record<Criterion, number> => ({ 시간: 0, 비용: 0, 안전: 0, 환경: 0, 편리성: 0 });
const pageNames = ["상황 선택", "입체 경로", "준비물", "AI 평가", "계획 수정", "결과 포스터"];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(1);
  const [ratings, setRatings] = useState<Record<Criterion, number>>(emptyRatings);
  const [review, setReview] = useState("");
  const [revision, setRevision] = useState("");
  const [teamName, setTeamName] = useState("반짝이는 수송 탐험대");
  const selected = scenarios.find((item) => item.id === selectedId) ?? scenarios[0];
  const average = useMemo(() => {
    const scores = Object.values(ratings).filter(Boolean);
    return scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "0.0";
  }, [ratings]);

  const move = (next: number) => {
    setPage(Math.max(0, Math.min(pageNames.length - 1, next)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const choose = (id: number) => {
    setSelectedId(id); setRatings(emptyRatings()); setReview(""); setRevision("");
  };

  if (!started) {
    return (
      <main className="cover-page">
        <div className="cover-image-wrap">
          <img
            src="/og.png"
            alt="입체 여행 경로와 AI 안내 로봇이 있는 AI 여행 상담소"
          />
        </div>
        <div className="cover-copy">
          <span className="cover-subject">초등학교 5학년 실과 · 생활과 수송</span>
          <h1>AI 여행 상담소</h1>
          <p>
            여행 경로를 탐험하고, AI의 추천을 꼼꼼히 판단한 뒤
            <br />우리 모둠만의 발표 포스터를 완성해요.
          </p>
          <div className="cover-flow" aria-label="활동 순서">
            <span><b>1</b>상황 선택</span>
            <i>→</i>
            <span><b>2</b>입체 경로</span>
            <i>→</i>
            <span><b>3</b>준비·평가</span>
            <i>→</i>
            <span><b>4</b>포스터</span>
          </div>
          <button
            className="cover-start"
            onClick={() => {
              setStarted(true);
              window.scrollTo({ top: 0 });
            }}
          >
            활동 시작하기 <span>➜</span>
          </button>
          <small>총 6개 페이지 · 모둠 활동 약 40분</small>
        </div>
      </main>
    );
  }

  return (
    <div className="journey-app">
      <header className="journey-header">
        <button className="journey-brand" onClick={() => move(0)}><span>🧭</span><b>AI 여행 상담소<small>생활과 수송 · 깊이 있는 이동 계획</small></b></button>
        <div className="page-meter"><span>{page + 1} / {pageNames.length}</span><b>{pageNames[page]}</b><i><em style={{ width: `${((page + 1) / pageNames.length) * 100}%` }} /></i></div>
      </header>

      <nav className="page-tabs" aria-label="활동 단계">
        {pageNames.map((name, index) => <button key={name} className={page === index ? "active" : ""} onClick={() => move(index)}><span>{index + 1}</span>{name}</button>)}
      </nav>

      <main className="page-stage">
        {page === 0 && (
          <section className="activity-page intro-page">
            <div className="page-kicker">PAGE 1 · 여행 상황 탐색</div>
            <h1>우리 모둠이 해결할<br /><em>이동 미션</em>을 골라요</h1>
            <p className="page-lead">상황마다 사람, 거리, 시간, 비용과 위험 요소가 달라요. 카드의 정보를 비교하고 가장 탐구하고 싶은 미션을 선택하세요.</p>
            <div className="mission-grid">
              {scenarios.map((item) => (
                <button key={item.id} className={`mission-card ${item.color} ${item.id === selectedId ? "selected" : ""}`} onClick={() => choose(item.id)}>
                  <span className="mission-group">{item.group}</span><span className="mission-icon">{item.icon}</span>
                  <h2>{item.title}</h2><strong>{item.route}</strong><p>{item.mission}</p>
                  <dl><div><dt>거리</dt><dd>{item.distance}</dd></div><div><dt>예상 시간</dt><dd>{item.time}</dd></div><div><dt>추천 수단</dt><dd>{item.transport}</dd></div></dl>
                  <span className="mission-select">{item.id === selectedId ? "✓ 선택한 미션" : "이 미션 선택하기"}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {page === 1 && (
          <section className="activity-page route-page">
            <div className="route-title-row"><div><div className="page-kicker">PAGE 2 · 입체 이동 경로</div><h1>{selected.icon} {selected.title}</h1><p>{selected.route} · {selected.distance} · {selected.time}</p></div><div className="route-summary"><span>추천 이동수단</span><b>{selected.transport}</b><small>{selected.cost}</small></div></div>
            <div className="route-world" aria-label={`${selected.route} 입체 여행 경로`}>
              <div className="route-sky"><span>☁️</span><span>☀️</span><span>☁️</span></div>
              <div className="route-plane">
                {selected.stops.map((stop, index) => (
                  <div className="route-point" key={stop.name} style={{ "--delay": `${index * .08}s` } as React.CSSProperties}>
                    <div className="point-pin"><span>{stop.icon}</span></div>
                    <div className="point-card"><small>STOP {index + 1}</small><b>{stop.name}</b><span>{stop.detail}</span><em>{stop.duration}</em></div>
                    {index < selected.stops.length - 1 && <div className="route-rail"><i>➜</i></div>}
                  </div>
                ))}
              </div>
              <div className="route-landmarks"><span>🌲</span><span>🏘️</span><span>🌳</span><span>⛰️</span><span>🌲</span></div>
            </div>
            <div className="timeline-panel"><h2>시간별 이동 계획</h2><div>{selected.schedule.map((item) => <article key={item.time}><time>{item.time}</time><span /><div><b>{item.title}</b><p>{item.detail}</p></div></article>)}</div></div>
            <div className="alternative-box"><span>🔄</span><div><h3>다른 방법과 비교하기</h3>{selected.alternatives.map((item) => <p key={item}>{item}</p>)}</div></div>
          </section>
        )}

        {page === 2 && (
          <section className="activity-page essentials-page">
            <div className="page-kicker">PAGE 3 · 준비와 안전</div><h1>여행 전에 무엇을<br /><em>꼭 준비해야 할까요?</em></h1><p className="page-lead">{selected.title} 상황에 꼭 맞는 준비물과 안전·환경 약속을 확인하세요. 단순한 목록이 아니라 왜 필요한지도 함께 생각해요.</p>
            <div className="packing-board">
              <div className="suitcase"><div className="suitcase-handle" /><div className="suitcase-body"><span>{selected.icon}</span><b>{selected.title}</b><small>{selected.route}</small></div></div>
              <div className="packing-grid">{selected.essentials.map((item, index) => <article key={item.name}><span>{item.icon}</span><div><small>준비물 {index + 1}</small><h3>{item.name}</h3><p>{item.reason}</p></div></article>)}</div>
            </div>
            <div className="promise-columns">
              <article className="safety-panel"><h2>🛡️ 안전 약속</h2><ol>{selected.safety.map((item) => <li key={item}>{item}</li>)}</ol></article>
              <article className="eco-panel"><h2>🌱 환경 약속</h2><ol>{selected.eco.map((item) => <li key={item}>{item}</li>)}</ol></article>
              <article className="check-panel"><h2>📞 비상 상황에는</h2><p><b>1.</b> 안전한 곳에 멈추기</p><p><b>2.</b> 현재 위치와 상황 확인하기</p><p><b>3.</b> 보호자·교사 또는 119에 알리기</p><p><b>4.</b> 안내에 따라 침착하게 행동하기</p></article>
            </div>
          </section>
        )}

        {page === 3 && (
          <section className="activity-page evaluation-page">
            <div className="page-kicker">PAGE 4 · AI 추천 비판하기</div><h1>AI의 추천은 정말<br /><em>모두 알맞을까요?</em></h1><p className="page-lead">별점만 주지 말고 근거를 생각해 보세요. AI가 놓친 사람, 정보, 위험은 없는지 탐정처럼 살펴봐요.</p>
            <div className="ai-answer-card"><span className="ai-face">AI</span><div><small>AI의 추천</small><h2>{selected.transport}</h2><p>{selected.time}이 걸리고 비용은 {selected.cost}으로 예상해요. 빠르기, 편리성, 이동 인원을 고려한 조합입니다.</p></div></div>
            <div className="evaluation-grid">
              {criteria.map((item) => <article key={item.name}><div className="criterion-head"><span>{item.icon}</span><div><h3>{item.name}</h3><p>{item.question}</p></div></div><div className="rating-buttons">{[1,2,3,4,5].map(score => <button key={score} className={ratings[item.name] >= score ? "on" : ""} onClick={() => setRatings({...ratings,[item.name]:score})} aria-label={`${item.name} ${score}점`}>★</button>)}</div><small>{ratings[item.name] ? `${ratings[item.name]}점으로 평가했어요` : "별을 눌러 평가하세요"}</small></article>)}
            </div>
            <div className="review-note"><label htmlFor="review">🔍 우리가 발견한 점</label><p>잘한 점, 빠뜨린 점, 실제 정보와 다를 수 있는 점을 구체적으로 적어 보세요.</p><textarea id="review" value={review} onChange={e=>setReview(e.target.value)} placeholder="예) 단체 이동인데 환승 시간과 인원 확인 방법이 부족해요. 실제 시간표와 비용도 공식 자료에서 다시 확인해야 해요." maxLength={500}/><span>{review.length} / 500자</span></div>
          </section>
        )}

        {page === 4 && (
          <section className="activity-page plan-page">
            <div className="page-kicker">PAGE 5 · 더 좋은 계획 만들기</div><h1>우리 모둠의 판단으로<br /><em>계획을 업그레이드해요</em></h1><p className="page-lead">AI 추천에서 쓸 부분과 바꿀 부분을 나누고, 실제로 실행할 수 있는 구체적인 수정안을 완성하세요.</p>
            <div className="plan-canvas">
              <article><span>KEEP</span><h2>유지할 장점</h2><ul><li>{selected.transport}의 핵심 장점</li><li>{selected.time} 안에 도착하는 효율성</li><li>상황과 이동 인원을 고려한 경로</li></ul></article>
              <article><span>CHECK</span><h2>반드시 확인할 정보</h2><ul><li>출발일의 실제 시간표와 요금</li><li>날씨와 운행·운항 여부</li><li>예약, 할인, 보험, 접근성 조건</li></ul></article>
              <article><span>CHANGE</span><h2>우리의 수정 방향</h2><ul><li>환승마다 인원 확인 담당 정하기</li><li>지연·결항 때 사용할 대체 수단 정하기</li><li>준비물과 비상 연락 방법 공유하기</li></ul></article>
            </div>
            <div className="revision-editor"><div><label htmlFor="revision">✍️ 우리 모둠의 최종 이동 계획</label><p>누가, 언제, 무엇을 확인하고 어떻게 행동할지 한 문단으로 완성하세요.</p></div><textarea id="revision" value={revision} onChange={e=>setRevision(e.target.value)} placeholder={`${selected.transport}을 이용하되, 출발 하루 전 실제 시간표와 날씨를 확인합니다. 환승 때마다 모둠장이 인원을 확인하고, 문제가 생기면 미리 정한 대체 이동수단을 사용합니다.`} maxLength={700}/><span>{revision.length} / 700자</span></div>
            <label className="team-field">모둠 이름<input value={teamName} onChange={e=>setTeamName(e.target.value)} maxLength={28}/></label>
          </section>
        )}

        {page === 5 && (
          <section className="activity-page poster-page">
            <div className="page-kicker">PAGE 6 · 최종 결과물</div><h1>우리 모둠의<br /><em>스마트 여행 포스터</em></h1><p className="page-lead">앞에서 조사하고 판단한 내용이 한 장의 발표 포스터로 완성됐어요. 화면을 보여 주며 경로와 선택 근거를 발표해 보세요.</p>
            <article className={`final-poster poster-${selected.color}`}>
              <header><div><small>SMART TRANSPORT PROJECT</small><h2>{selected.title}</h2><p>{selected.mission}</p></div><span>{selected.icon}</span></header>
              <div className="poster-route"><div><small>출발</small><b>{selected.stops[0].name}</b></div><span>••• ✦ ••• ✦ •••</span><div><small>도착</small><b>{selected.stops[selected.stops.length-1].name}</b></div></div>
              <div className="poster-facts"><div><small>선택한 이동수단</small><b>{selected.transport}</b></div><div><small>예상 시간</small><b>{selected.time}</b></div><div><small>예상 비용</small><b>{selected.cost}</b></div><div><small>AI 평가 점수</small><b>{average} / 5.0</b></div></div>
              <div className="poster-map">{selected.stops.map((stop,index)=><div key={stop.name}><span>{stop.icon}</span><b>{stop.name}</b>{index<selected.stops.length-1&&<i>➜</i>}</div>)}</div>
              <div className="poster-content"><section><h3>🔎 AI 추천에서 발견한 점</h3><p>{review || "AI의 추천을 시간, 비용, 안전, 환경, 편리성의 관점에서 검토한 내용을 작성해 주세요."}</p></section><section><h3>🌟 우리 모둠의 최종 계획</h3><p>{revision || "확인할 정보, 안전 약속, 대체 이동수단을 포함한 최종 계획을 작성해 주세요."}</p></section></div>
              <footer><div><small>꼭 챙겨요</small><span>{selected.essentials.slice(0,4).map(item=><b key={item.name}>{item.icon} {item.name}</b>)}</span></div><strong>🧭 {teamName}</strong></footer>
            </article>
            <div className="poster-tip"><span>🎤</span><p><b>발표 팁</b> “AI가 추천한 내용 → 우리가 확인한 문제 → 더 나은 최종 계획” 순서로 설명하면 생각의 변화가 잘 보여요.</p></div>
          </section>
        )}
      </main>

      <div className="page-controls">
        <button onClick={() => move(page - 1)} disabled={page === 0}>← 이전 페이지</button>
        <div><span>{pageNames[page]}</span><small>{page + 1} / {pageNames.length}</small></div>
        <button className="next" onClick={() => move(page + 1)} disabled={page === pageNames.length - 1}>{page === pageNames.length - 1 ? "완성!" : "다음 페이지 →"}</button>
      </div>
    </div>
  );
}
