const Notice = ({message, date}) => {
  var d1 = new Date();
  var d2 = new Date(date);
  if (d1.getTime() > d2.getTime()) return null;
  return (
    <div className="bg-[#F8F8F8] brightness-95 flex flex-row gap-4 overflow-hidden group">
      <div className="flex items-center justify-between gap-4 flex-shrink-0 min-w-[100%] animate-stream group-hover:paused select-none">
        <NoticeItem message={message} />
        <NoticeItem message={message} />
        <NoticeItem message={message} />
        <NoticeItem message={message} />
        <NoticeItem message={message} />
      </div>
      <div
        aria-hidden="true"
        className="flex items-center justify-between gap-4 flex-shrink-0 min-w-[100%] animate-stream group-hover:paused select-none"
      >
        <NoticeItem message={message} />
        <NoticeItem message={message} />
        <NoticeItem message={message} />
        <NoticeItem message={message} />
        <NoticeItem message={message} />
      </div>
    </div>
  );
};

export default Notice;

const NoticeItem = ({message}) => {
  return (
    <div className="flex justify-center items-center gap-2  text-[#222]  md:text-base text-xs  p-3">
      <span className="font-semibold">SuperCoffee</span>
      <svg className="w-[18px] h-[18px] fill-[#222]" viewBox="0 0 100 100">
        <path d="M50,97.5c-26.1915607,0-47.5-21.3084412-47.5-47.5S23.8084393,2.5,50,2.5S97.5,23.8084393,97.5,50S76.1915588,97.5,50,97.5z   M50,7.0238094C26.3030148,7.0238094,7.0238104,26.3030128,7.0238104,50S26.3030148,92.9761887,50,92.9761887  S92.9761887,73.6969833,92.9761887,50S73.6969833,7.0238094,50,7.0238094z"></path>
        <g>
          <ellipse
            cx="35.2381935"
            cy="34.3672791"
            rx="4.7493854"
            ry="6.5021348"
          ></ellipse>
        </g>
        <g>
          <ellipse
            cx="64.7618027"
            cy="34.3672791"
            rx="4.7493854"
            ry="6.5021348"
          ></ellipse>
        </g>
        <path d="M50,80.4100494c-14.6896172,0-26.6402111-11.4621811-26.6402111-25.5509796  c0-1.2492523,1.0131454-2.2619057,2.2619038-2.2619057c1.2487602,0,2.2619057,1.0126534,2.2619057,2.2619057  c0,11.594223,9.9213562,21.0271759,22.1164017,21.0271759s22.1164017-9.4329529,22.1164017-21.0271759  c0-1.2492523,1.0131454-2.2619057,2.2619019-2.2619057c1.248764,0,2.2619095,1.0126534,2.2619095,2.2619057  C76.640213,68.9478683,64.689621,80.4100494,50,80.4100494z"></path>
      </svg>
      {message}
    </div>
  );
};
