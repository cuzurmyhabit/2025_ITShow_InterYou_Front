// Warning.jsx
import React, { useEffect, useState } from 'react';
import './Warning.css';

function Warning({ imageUrl, onClose, isOpen }) {
  const [shouldRender, setShouldRender] = useState(false); // DOM에 렌더링될지 여부
  const [isActive, setIsActive] = useState(false); // CSS 트랜지션 활성화 여부

  useEffect(() => {
    let showTimer;
    let hideTimer;

    if (isOpen) {
      // 1. 먼저 DOM에 렌더링하도록 설정 (display: none 상태로)
      setShouldRender(true); 

      // 2. 다음 프레임에 display: flex로 변경하고 opacity 트랜지션 시작
      showTimer = setTimeout(() => {
        setIsActive(true); // .is-open 클래스 추가
      }, 50); // 아주 짧은 지연 (예: 50ms)을 주어 브라우저가 display 변경을 처리할 시간을 줍니다.
              // 0ms도 가능하지만, 50ms가 더 안정적일 수 있습니다.

    } else {
      // 1. is-open 클래스를 제거하여 애니메이션 역재생 시작
      setIsActive(false);

      // 2. 애니메이션이 끝난 후 DOM에서 제거 (display: none 상태로 되돌림)
      hideTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // CSS transition 시간(0.3s = 300ms)과 맞춰야 합니다.
    }

    // 클린업 함수
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]); // isOpen prop이 변경될 때마다 실행

  if (!shouldRender) {
    return null; // 모달이 닫혀있을 때는 아무것도 렌더링하지 않음
  }

  // shouldRender가 true일 때만 렌더링하며, isActive에 따라 클래스 적용
  const overlayClass = `warning-modal-overlay ${isActive ? 'is-open' : ''}`;
  const contentClass = `warning-modal-content ${isActive ? 'is-open' : ''}`;

  return (
    <div className={overlayClass} onClick={onClose}>
      <div className={contentClass} onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Warning" />
        <button className="close-button" onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Warning;