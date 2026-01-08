# 제목 없음

# **프론트엔드 디자인 디버깅 및 개선 리스트**

현재 코드베이스(

App.jsx,

**index.css**

,

**Navbar.jsx**

,

**Hero.jsx**

) 분석 결과, 다음 부분들에 대한 검토 및 디버깅이 필요합니다.

## **1. 디자인 시스템 일관성 (Design System Consistency)**

bpco_design_system.json에 정의된 토큰들이 코드에 제대로 적용되지 않고 하드코딩된 경우가 많습니다.

- **Navbar.jsx**:
    - `backgroundColor: 'rgba(240, 238, 233, 0.8)'` 등 색상 값이 하드코딩되어 있습니다. `var(--white-overlay)` 등으로 대체해야 합니다.
    - `borderRadius: '50px'`, `padding` 등도 시스템 토큰(`-spacing-*`)을 사용하는 것이 좋습니다.
- **Hero.jsx**:
    - `fontSize: '24px'`, `WebkitTextStroke` 등 스타일이 인라인으로 하드코딩되어 있어 유지보수가 어렵습니다.
- **Typography**:
    - 폰트 패밀리는 `var(--font-primary)` 등으로 잘 사용되고 있으나, 일부 컴포넌트에서 폰트 사이즈가 픽셀(`px`)로 고정되어 있습니다.

## **2. 반응형 디자인 (Responsive Design)**

현재 `inline style` 위주로 작성되어 있어 모바일 화면 대응(Media Query)이 어렵습니다.

- **Navbar**:
    - `gridTemplateColumns: 'minmax(200px, 1fr) auto minmax(200px, 1fr)'` 구조는 모바일에서 공간이 부족할 수 있습니다. 햄버거 메뉴 등으로의 전환 고려가 필요합니다.
- **Hero**:
    - `fontSize: 'var(--fs-hero)'` (15vw)는 반응형으로 작동하지만, 하단 서브 텍스트들의 배치(`display: flex`, `justifyContent: 'space-between'`)는 모바일 세로 화면에서 깨질 가능성이 큽니다.

## **3. UX 및 접근성 (UX & Accessibility)**

- **커서 (Custom Cursor)**:
    - `{ cursor: none; }` 설정이 되어 있습니다. `CustomCursor` 컴포넌트가 모든 인터랙티브 요소(버튼, 링크, input 등) 위에서 올바르게 반응(hover state 등)하는지 확인해야 합니다.
- **접근성**:
    - 이미지 태그에 `alt` 속성이 적절히 들어가 있는지 확인이 필요합니다 (현재 **Hero.jsx** 배경은 div background라 해당 없음).
    - 키보드 내비게이션 시 포커스 링이 보이지 않을 수 있습니다 (`cursor: none` 및 커스텀 스타일링 때문).

## **4. 코드 구조 및 성능**

- **인라인 스타일 제거**:
    - `style={{ ... }}` 패턴이 과도하게 사용되고 있습니다. 이를 CSS 파일(**index.css**)의 클래스나 별도 CSS 모듈로 분리하여 성능 최적화 및 가독성을 높여야 합니다.
- **이미지 로딩**:
    - **hero_bg.png** 등 큰 이미지는 로딩 최적화(WebP 변환, 적절한 사이즈 사용)가 필요할 수 있습니다.

## **5. 버그 수정 (Known Issues)**

- **Favicon**: 현재 `vite.svg` 링크가 깨져 있어 브라우저 탭 아이콘이 뜨지 않습니다. (별도 작업으로 진행 중)