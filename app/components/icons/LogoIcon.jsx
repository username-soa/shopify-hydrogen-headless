import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

const LogoIcon = ({className}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 2430 343"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(clsx('w-full', className))}
    >
      <path
        d="M101.713 328.1C121.813 328.1 138.013 323.15 150.313 313.25C162.913 303.35 169.213 288.8 169.213 269.6C169.213 254.3 164.563 241.55 155.263 231.35C145.963 220.85 129.763 212.45 106.663 206.15L75.6129 197.15C52.8129 190.85 35.4129 180.2 23.4129 165.2C11.4129 150.2 5.41289 131.9 5.41289 110.3C5.41289 95.9 8.71289 82.4 15.3129 69.8C22.2129 57.2 32.5629 47 46.3629 39.2C60.4629 31.4 78.3129 27.5 99.9129 27.5C123.913 27.5 143.263 32 157.963 41C172.663 49.7 182.863 61.1 188.563 75.2C194.263 89.3 195.613 104.45 192.613 120.65L154.813 128.75C158.713 100.85 155.863 79.4 146.263 64.4C136.963 49.4 120.763 41.9 97.6629 41.9C79.3629 41.9 64.9629 46.85 54.4629 56.75C43.9629 66.35 38.7129 80.45 38.7129 99.05C38.7129 113.75 42.9129 126.35 51.3129 136.85C59.7129 147.05 74.5629 155.15 95.8629 161.15L126.913 170.15C177.013 183.95 202.063 213.2 202.063 257.9C202.063 273.8 198.313 288.2 190.813 301.1C183.613 313.7 172.513 323.75 157.513 331.25C142.813 338.75 124.213 342.5 101.713 342.5C86.1129 342.5 71.1129 340.1 56.7129 335.3C42.6129 330.5 30.4629 322.25 20.2629 310.55C10.3629 298.85 3.76289 282.65 0.462891 261.95L27.4629 252.95C28.9629 272.75 33.3129 288.05 40.5129 298.85C47.7129 309.65 56.7129 317.3 67.5129 321.8C78.3129 326 89.7129 328.1 101.713 328.1ZM430.146 44.15V32H516.096V44.15L491.346 46.4C486.546 47 483.696 48.2 482.796 50C481.896 51.8 481.446 57.95 481.446 68.45V234.05C481.446 268.25 473.496 294.95 457.596 314.15C441.996 333.05 417.996 342.5 385.596 342.5C350.196 342.5 323.046 332.15 304.146 311.45C285.546 290.75 276.246 262.25 276.246 225.95V68.45C276.246 57.95 275.796 51.8 274.896 50C273.996 48.2 271.146 47 266.346 46.4L241.596 44.15V32H350.046V44.15L325.296 46.4C320.496 47 317.646 48.2 316.746 50C315.846 51.8 315.396 57.95 315.396 68.45V232.7C315.396 264.8 321.396 288.65 333.396 304.25C345.696 319.85 364.296 327.65 389.196 327.65C414.396 327.65 433.296 319.7 445.896 303.8C458.496 287.9 464.796 264.8 464.796 234.5V68.45C464.796 57.95 464.346 51.8 463.446 50C462.546 48.2 459.696 47 454.896 46.4L430.146 44.15ZM552.887 44.15V32H680.687C710.387 32 733.037 39.5 748.637 54.5C764.237 69.2 772.037 88.85 772.037 113.45V126.5C772.037 151.1 764.237 170.9 748.637 185.9C733.037 200.9 710.387 208.4 680.687 208.4H626.687V301.55C626.687 312.05 627.137 318.35 628.037 320.45C628.937 322.25 631.787 323.3 636.587 323.6L670.337 326.3V338H552.887V326.3L577.637 323.6C582.437 323 585.287 321.8 586.187 320C587.087 318.2 587.537 312.05 587.537 301.55V68.45C587.537 57.95 587.087 51.8 586.187 50C585.287 48.2 582.437 47 577.637 46.4L552.887 44.15ZM680.687 46.4H626.687V194H680.687C713.987 194 730.637 173.6 730.637 132.8V107.15C730.637 66.65 713.987 46.4 680.687 46.4ZM1015.14 264.65H1026.84V338H811.286V326.3L836.036 323.6C840.836 323 843.686 321.8 844.586 320C845.486 318.2 845.936 312.05 845.936 301.55V68.45C845.936 57.95 845.486 51.8 844.586 50C843.686 48.2 840.836 47 836.036 46.4L811.286 44.15V32H1020.99V105.35H1009.74L996.686 58.1C995.786 54.5 994.736 51.95 993.536 50.45C992.636 48.65 990.686 47.6 987.686 47.3C984.686 46.7 979.586 46.4 972.386 46.4H885.086V176.45H945.386C952.586 176.45 957.686 176.3 960.686 176C963.686 175.4 965.636 174.35 966.536 172.85C967.736 171.05 968.786 168.35 969.686 164.75L978.236 131H989.936V236.3H978.236L969.686 202.55C968.786 198.95 967.736 196.4 966.536 194.9C965.636 193.1 963.686 192.05 960.686 191.75C957.686 191.15 952.586 190.85 945.386 190.85H885.086V323.6H977.786C984.986 323.6 990.086 323.45 993.086 323.15C996.086 322.55 998.036 321.5 998.936 320C1000.14 318.2 1001.19 315.5 1002.09 311.9L1015.14 264.65ZM1072.32 44.15V32H1197.42C1226.82 32 1249.32 39.05 1264.92 53.15C1280.82 66.95 1288.77 85.4 1288.77 108.5V122.45C1288.77 140.75 1283.67 156.35 1273.47 169.25C1263.57 181.85 1249.32 190.55 1230.72 195.35L1288.32 301.55C1292.22 308.75 1295.07 313.85 1296.87 316.85C1298.67 319.55 1300.32 321.35 1301.82 322.25C1303.62 322.85 1306.02 323.3 1309.02 323.6L1329.27 326.3V338H1261.32L1190.22 199.4H1146.12V301.55C1146.12 312.05 1146.57 318.2 1147.47 320C1148.37 321.8 1151.22 323 1156.02 323.6L1180.77 326.3V338H1072.32V326.3L1097.07 323.6C1101.87 323 1104.72 321.8 1105.62 320C1106.52 318.2 1106.97 312.05 1106.97 301.55V68.45C1106.97 57.95 1106.52 51.8 1105.62 50C1104.72 48.2 1101.87 47 1097.07 46.4L1072.32 44.15ZM1197.42 46.4H1146.12V185H1197.42C1213.02 185 1225.17 180.05 1233.87 170.15C1242.87 159.95 1247.37 144.65 1247.37 124.25V106.7C1247.37 86.3 1242.87 71.15 1233.87 61.25C1225.17 51.35 1213.02 46.4 1197.42 46.4ZM1455.27 114.8C1433.97 114.8 1416.12 125 1401.72 145.4C1387.62 165.8 1380.57 194 1380.57 230C1380.57 266 1387.02 292.7 1399.92 310.1C1413.12 327.5 1430.37 336.2 1451.67 336.2C1478.37 336.2 1502.07 331.7 1522.77 322.7L1524.12 325.85C1502.82 335.15 1477.92 339.8 1449.42 339.8C1420.92 339.8 1397.22 330.8 1378.32 312.8C1359.42 294.8 1349.97 267.05 1349.97 229.55C1349.97 192.05 1359.87 162.95 1379.67 142.25C1399.47 121.55 1424.67 111.2 1455.27 111.2C1472.37 111.2 1488.12 115.1 1502.52 122.9C1517.22 130.7 1528.02 142.55 1534.92 158.45H1506.12C1501.62 143.75 1494.72 132.8 1485.42 125.6C1476.42 118.4 1466.37 114.8 1455.27 114.8ZM1664.48 339.8C1632.98 339.8 1607.33 330.8 1587.53 312.8C1567.73 294.8 1557.83 267.05 1557.83 229.55C1557.83 192.05 1568.03 162.95 1588.43 142.25C1609.13 121.55 1635.23 111.2 1666.73 111.2C1698.53 111.2 1724.33 120.2 1744.13 138.2C1763.93 156.2 1773.83 183.95 1773.83 221.45C1773.83 258.95 1763.48 288.05 1742.78 308.75C1722.38 329.45 1696.28 339.8 1664.48 339.8ZM1667.63 114.8C1644.83 114.8 1625.93 125 1610.93 145.4C1595.93 165.5 1588.43 193.7 1588.43 230C1588.43 266 1595.33 292.7 1609.13 310.1C1622.93 327.5 1641.23 336.2 1664.03 336.2C1686.83 336.2 1705.73 326.15 1720.73 306.05C1735.73 285.65 1743.23 257.45 1743.23 221.45C1743.23 185.15 1736.33 158.3 1722.53 140.9C1708.73 123.5 1690.43 114.8 1667.63 114.8ZM1839.55 91.85V113H1875.1V116.6H1839.55V338H1808.05V116.6H1798.6V113H1808.05V91.85C1808.05 59.15 1815.1 35.9 1829.2 22.1C1843.3 7.99999 1866.1 0.799987 1897.6 0.499973V4.09998C1876.9 4.39998 1862.05 11.45 1853.05 25.25C1844.05 38.75 1839.55 60.95 1839.55 91.85ZM1945.46 91.85V113H1981.01V116.6H1945.46V338H1913.96V116.6H1904.51V113H1913.96V91.85C1913.96 59.15 1921.01 35.9 1935.11 22.1C1949.21 7.99999 1972.01 0.799987 2003.51 0.499973V4.09998C1982.81 4.39998 1967.96 11.45 1958.96 25.25C1949.96 38.75 1945.46 60.95 1945.46 91.85ZM2043.27 228.2C2043.27 265.4 2049.72 292.7 2062.62 310.1C2075.82 327.5 2093.07 336.2 2114.37 336.2C2144.37 336.2 2171.07 331.7 2194.47 322.7L2195.82 325.85C2171.82 335.15 2144.67 339.8 2114.37 339.8C2084.37 339.8 2059.92 330.8 2041.02 312.8C2022.12 294.8 2012.67 267.05 2012.67 229.55C2012.67 192.05 2022.57 162.95 2042.37 142.25C2062.17 121.55 2087.37 111.2 2117.97 111.2C2142.57 111.2 2163.27 118.55 2180.07 133.25C2196.87 147.95 2205.27 169.7 2205.27 198.5C2205.27 200 2205.27 201.5 2205.27 203H2044.62C2043.72 211.1 2043.27 219.5 2043.27 228.2ZM2174.67 199.4C2174.37 170.6 2168.82 149.3 2158.02 135.5C2147.22 121.7 2133.27 114.8 2116.17 114.8C2099.07 114.8 2083.77 122.3 2070.27 137.3C2057.07 152.3 2048.67 173 2045.07 199.4H2174.67ZM2267.83 228.2C2267.83 265.4 2274.28 292.7 2287.18 310.1C2300.38 327.5 2317.63 336.2 2338.93 336.2C2368.93 336.2 2395.63 331.7 2419.03 322.7L2420.38 325.85C2396.38 335.15 2369.23 339.8 2338.93 339.8C2308.93 339.8 2284.48 330.8 2265.58 312.8C2246.68 294.8 2237.23 267.05 2237.23 229.55C2237.23 192.05 2247.13 162.95 2266.93 142.25C2286.73 121.55 2311.93 111.2 2342.53 111.2C2367.13 111.2 2387.83 118.55 2404.63 133.25C2421.43 147.95 2429.83 169.7 2429.83 198.5C2429.83 200 2429.83 201.5 2429.83 203H2269.18C2268.28 211.1 2267.83 219.5 2267.83 228.2ZM2399.23 199.4C2398.93 170.6 2393.38 149.3 2382.58 135.5C2371.78 121.7 2357.83 114.8 2340.73 114.8C2323.63 114.8 2308.33 122.3 2294.83 137.3C2281.63 152.3 2273.23 173 2269.63 199.4H2399.23Z"
        fill="#222222"
      />
    </svg>
  );
};

export default LogoIcon;
