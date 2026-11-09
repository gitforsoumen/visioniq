import svgPaths from "./svg-w7xy415mq7";
import imgWelcomeBackGladToHaveYouHere from "figma:asset/5abb773496149b790cfb536df3bb90dfab888005.png";

function GradientBg() {
  return (
    <div className="absolute h-[982px] left-0 top-0 w-[1512px]" data-name="gradient bg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1512 982">
        <g clipPath="url(#clip0_23_294)" id="gradient bg">
          <ellipse cx="1361.27" cy="594.648" fill="var(--fill-0, #BB30F3)" id="pink" opacity="0.1" rx="306.88" ry="306.661" transform="rotate(-30.2801 1361.27 594.648)" />
          <ellipse cx="347.062" cy="837.88" fill="var(--fill-0, #D5BF3E)" id="yellow" opacity="0.1" rx="448.248" ry="263.157" transform="rotate(27.392 347.062 837.88)" />
          <ellipse cx="885.434" cy="563.618" fill="var(--fill-0, #FFDEDE)" id="red" rx="301.5" ry="219.266" transform="rotate(18.824 885.434 563.618)" />
          <ellipse cx="696.408" cy="235.024" fill="var(--fill-0, #4877DA)" id="blue" opacity="0.12" rx="388.287" ry="288.148" transform="rotate(19.2443 696.408 235.024)" />
          <foreignObject height="1782" width="2312" x="-400" y="-400">
            <div style={{ backdropFilter: "blur(200px)", clipPath: "url(#bgblur_1_23_294_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <g data-figma-bg-blur-radius="400" id="blur">
            <rect fill="var(--fill-0, #D9D9D9)" fillOpacity="0.02" height="982" style={{ mixBlendMode: "multiply" }} width="1512" />
          </g>
        </g>
        <defs>
          <clipPath id="bgblur_1_23_294_clip_path" transform="translate(400 400)">
            <rect height="982" width="1512" />
          </clipPath>
          <clipPath id="clip0_23_294">
            <rect fill="white" height="982" width="1512" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function HeaderAndParagraph() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-name="header and paragraph">
      <p className="font-['Poppins:Medium',_sans-serif] relative shrink-0 text-[20px] text-gray-900 w-full">{`Upload & Summary`}</p>
      <p className="font-['Poppins:Regular',_sans-serif] relative shrink-0 text-[16px] text-gray-700 w-full">Add your design to generate an auto-summary. You’ll be able to review and make changes to the content afterward.</p>
    </div>
  );
}

function AdsClick() {
  return (
    <div className="relative size-[20px]" data-name="ads_click">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ads_click">
          <mask height="20" id="mask0_23_290" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_23_290)">
            <path d={svgPaths.p3572cf80} fill="var(--fill-0, #193E58)" id="ads_click_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Selected() {
  return (
    <div className="basis-0 bg-[#e8edf1] grow h-[49px] min-h-px min-w-px relative rounded-tl-[5px] rounded-tr-[5px] shrink-0" data-name="selected">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-300 border-solid inset-0 pointer-events-none rounded-tl-[5px] rounded-tr-[5px]" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-[20px] h-[49px] items-center justify-center px-[41px] py-[19px] relative w-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none scale-y-[-100%]">
              <AdsClick />
            </div>
          </div>
          <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#193e58] text-[16px] text-nowrap whitespace-pre">Design Mockups</p>
        </div>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="box-border content-stretch flex items-center mb-[-1px] relative rounded-tl-[5px] rounded-tr-[5px] shrink-0 w-full" data-name="tab">
      <div aria-hidden="true" className="absolute border-[1px_1px_0px] border-gray-300 border-solid bottom-0 left-[-1px] pointer-events-none right-[-1px] rounded-tl-[6px] rounded-tr-[6px] top-[-1px]" />
      <Selected />
    </div>
  );
}

function Frame1000008092() {
  return (
    <div className="h-[40px] relative shrink-0 w-[42px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 40">
        <g id="Frame 1000008092">
          <path d={svgPaths.p314b8bc0} fill="var(--fill-0, #2D70FF)" id="image_arrow_up" />
        </g>
      </svg>
    </div>
  );
}

function UploadSection() {
  return (
    <div className="bg-[#f6fbff] relative rounded-[5px] shrink-0 w-full" data-name="upload section">
      <div aria-hidden="true" className="absolute border-[1.5px] border-[rgba(45,112,255,0.3)] border-dashed inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-center justify-center p-[30px] relative w-full">
          <Frame1000008092 />
          <div className="flex flex-col font-['Poppins:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-700 text-nowrap">
            <p className="leading-[normal] whitespace-pre">Drag files here or browse</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabContent() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="tab content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[30px] relative w-full">
          <UploadSection />
        </div>
      </div>
    </div>
  );
}

function TabularContent() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-px pt-0 px-0 relative rounded-[5px] shrink-0 w-full" data-name="tabular content">
      <div aria-hidden="true" className="absolute border border-gray-300 border-solid inset-[-1px] pointer-events-none rounded-[6px]" />
      <Tab />
      <TabContent />
    </div>
  );
}

function Frame1000008111() {
  return (
    <div className="content-stretch flex font-['Poppins:Regular',_sans-serif] items-start justify-between leading-[normal] not-italic relative shrink-0 text-[16px] text-gray-500 text-nowrap w-[912px] whitespace-pre">
      <p className="relative shrink-0">Files Supported: JPG, JPEG, PNG</p>
      <p className="relative shrink-0">Max File Size: 200 MB</p>
    </div>
  );
}

function Frame1000008113() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full">
      <TabularContent />
      <Frame1000008111 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[12.5%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Group">
          <path d={svgPaths.p12e98f80} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function BtnIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="btn - icon">
      <Group />
    </div>
  );
}

function GenerateButton() {
  return (
    <div className="bg-gradient-to-r box-border content-stretch flex from-[rgba(45,112,255,0.3)] gap-[10px] h-[36px] items-center justify-center px-[12px] py-0 relative rounded-[5px] shrink-0 to-[rgba(187,48,243,0.3)]" data-name="Generate Button">
      <BtnIcon />
      <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Generate</p>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[30px] items-start left-[150px] overflow-clip p-[25px] rounded-[5px] shadow-[0px_0px_30px_0px_rgba(7,52,124,0.1)] top-[118px] w-[962px]" data-name="content">
      <HeaderAndParagraph />
      <Frame1000008113 />
      <GenerateButton />
    </div>
  );
}

function Group1() {
  return (
    <div className="[grid-area:1_/_1] h-[13.687px] ml-0 mt-0 relative w-[13.937px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group">
          <path d={svgPaths.p2c7bb800} fill="url(#paint0_linear_23_278)" id="Vector" />
          <path d={svgPaths.p3d647880} fill="url(#paint1_linear_23_278)" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_278" x1="6.84356" x2="6.84356" y1="0" y2="13.6867">
            <stop stopColor="#FBE0FF" />
            <stop offset="1" stopColor="#E9B3FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_23_278" x1="12.0445" x2="12.0445" y1="0.550157" y2="4.33705">
            <stop stopColor="#FBE0FF" />
            <stop offset="1" stopColor="#E9B3FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="icon">
      <Group1 />
    </div>
  );
}

function Object() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative" data-name="object">
      <Icon />
    </div>
  );
}

function Logo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="logo">
      <div className="[grid-area:1_/_1] h-[39.08px] ml-[8.415px] mt-[9px] relative w-[32.389px]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 40">
          <path d={svgPaths.pf1178c0} fill="url(#paint0_linear_23_262)" id="Subtract" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_262" x1="16.2056" x2="16.2056" y1="-0.0795513" y2="38.9993">
              <stop stopColor="#F7BFFF" />
              <stop offset="1" stopColor="#3888C9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Object />
    </div>
  );
}

function LogoName() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-center leading-[0] left-0 overflow-clip top-[10px] w-[80px]" data-name="logo & name">
      <Logo />
      <div className="flex flex-col font-['Poppins:Regular',_sans-serif] justify-center not-italic relative shrink-0 text-[0px] text-center text-gray-100 w-[67px]">
        <p className="font-['Poppins:Bold',_sans-serif] leading-[normal] text-[12px]">Pixel2Plan</p>
      </div>
    </div>
  );
}

function Add3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="add_2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="add_2">
          <mask height="32" id="mask0_23_255" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_23_255)">
            <path d={svgPaths.p3c6bf1f0} fill="var(--fill-0, #1C1B1F)" id="add_2_2" />
            <g id="add_2_3">
              <mask height="32" id="mask1_23_255" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                <rect fill="url(#paint0_linear_23_255)" height="32" id="Bounding box_2" width="32" />
              </mask>
              <g mask="url(#mask1_23_255)">
                <path d={svgPaths.p3c6bf1f0} fill="url(#paint1_linear_23_255)" id="add_2_4" />
              </g>
            </g>
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_255" x1="16" x2="16" y1="0" y2="32">
            <stop stopColor="#F3CDFE" />
            <stop offset="1" stopColor="#408ACB" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_23_255" x1="16" x2="16" y1="4" y2="28">
            <stop stopColor="#E9B3FF" />
            <stop offset="1" stopColor="#408ACB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function New() {
  return (
    <div className="bg-gradient-to-b from-[rgba(255,255,255,0.04)] relative rounded-[10px] shrink-0 size-[50px] to-[rgba(255,255,255,0.1)]" data-name="new">
      <div className="box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[18px] relative size-[50px]">
        <Add3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(209,213,219,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function History2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="history_2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="history_2">
          <mask height="32" id="mask0_23_274" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_23_274)">
            <path d={svgPaths.p19932d80} fill="url(#paint0_linear_23_274)" id="history_2_2" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_274" x1="16.1473" x2="16.1473" y1="2.66667" y2="29.3333">
            <stop stopColor="#E9B3FF" />
            <stop offset="1" stopColor="#408ACB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function History() {
  return (
    <div className="bg-gradient-to-b from-[rgba(255,255,255,0.04)] relative rounded-[10px] shrink-0 size-[50px] to-[rgba(255,255,255,0.1)]" data-name="history">
      <div className="box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[18px] relative size-[50px]">
        <History2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(209,213,219,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Ctas() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-[15px] top-[132.08px]" data-name="ctas">
      <New />
      <History />
    </div>
  );
}

function PowerSettingsNew() {
  return (
    <div className="absolute left-1/2 size-[32px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="power_settings_new">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="power_settings_new">
          <mask height="32" id="mask0_23_286" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="url(#paint0_linear_23_286)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_23_286)">
            <path d={svgPaths.p1a949d80} fill="url(#paint1_linear_23_286)" id="power_settings_new_2" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_286" x1="16" x2="16" y1="0" y2="32">
            <stop stopColor="#E9B3FF" />
            <stop offset="1" stopColor="#408ACB" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_23_286" x1="16" x2="16" y1="2.66667" y2="29.3333">
            <stop stopColor="#E9B3FF" />
            <stop offset="1" stopColor="#408ACB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function History1() {
  return (
    <div className="absolute bg-gradient-to-b bottom-[30px] from-[rgba(255,255,255,0.04)] left-[15px] rounded-[10px] size-[50px] to-[rgba(255,255,255,0.1)]" data-name="history">
      <div className="overflow-clip relative size-[50px]">
        <PowerSettingsNew />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(209,213,219,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function LeftNav() {
  return (
    <div className="absolute bg-gradient-to-b from-[#193e58] h-[982px] left-0 to-[#061a28] top-0 w-[80px]" data-name="left nav">
      <LogoName />
      <Ctas />
      <History1 />
    </div>
  );
}

export default function Design2WelcomeScreen5() {
  return (
    <div className="bg-white relative size-full" data-name="Design 2 - Welcome Screen 5">
      <GradientBg />
      <p className="absolute bg-center bg-clip-text bg-cover bg-no-repeat font-['Poppins:SemiBold',_sans-serif] leading-[normal] left-[150px] not-italic text-[40px] top-[50px] w-[962px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: `url('${imgWelcomeBackGladToHaveYouHere}')` }}>
        Welcome back! Glad to have you here.
      </p>
      <Content />
      <LeftNav />
    </div>
  );
}