import clsx from 'clsx';

const ArrowSvg = ({className, fill = 'white'}) => {
  return (
    <svg
      viewBox="0 0 16 16"
      className={clsx('transition-transform w-4 h-4', className)}
    >
      <path
        fill={fill}
        stroke={fill}
        strokeWidth="0.542084"
        d="M10.8101 1.96222L0.726954 12.0453L1.66171 12.9801L11.7448 2.89698L11.9344 9.4447L13.208 9.07311L13.0134 2.35278C12.9877 1.46249 12.2434 0.718185 11.3531 0.692412L4.80762 0.502924L4.43487 1.77539L10.8101 1.96222Z"
      ></path>
    </svg>
  );
};

export default ArrowSvg;
