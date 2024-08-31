import {motion} from 'framer-motion';
const About = () => {
  return (
    <div className="flex flex-col md:gap-14 gap-8 md:min-h-screen md:pt-20 pt-4">
      <h1 className="inline-block font-bold lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl max-w-prose-narrow">
        Why choose us
      </h1>
      <div className="flex-1 text-[#11171a] font-normal md:text-3xl md:leading-[130%] flex flex-col justify-evenly md:gap-14 gap-8">
        <p className="md:ml-auto md:w-[88%]">
          We are&nbsp;
          <br className="xxs:hidden flex" />
          <span className="bg-black px-2 py-1 rounded-lg text-white">
            The No. 1 Energy Boost in Brazil.
          </span>
          &nbsp;With a unique formula, it combines superfoods to provide
          optimized energy and mental focus. Ideal for you who seek energy,
          mental clarity and complete nutrition, without adrenaline spikes.
        </p>
        <div className="md:w-[95%]">
          <span className="opacity-70">Available in </span>
          <AnimatedText>Original</AnimatedText>,&nbsp;
          <AnimatedText>Chocolate</AnimatedText>
          <span className="opacity-70">&nbsp;and&nbsp;</span>
          <AnimatedText>Vanilla Latte</AnimatedText>
          <span className="opacity-70">
            &nbsp;flavors. SuperCoffee is carefully formulated with high quality
            ingredients. Ideal for those who seek an optimized energy in the day
            to day, whether for work, study or physical activities, in addition
            to containing SuperCafé, which offers a unique taste experience.
            Enriched with essential nutrients, it is the perfect choice for
            those who want to maintain focus and energy.
          </span>
        </div>
        <p className="md:ml-[6%] md:w-[88%]">
          <span className="opacity-100">All of our flavors </span>
          <span className="opacity-50">
            were developed thinking about the diverse taste of consumers. Each
            flavor offers a unique experience, ensuring that there is an option
            for everyone. Whether you are a traditional coffee lover or someone
            who appreciates a touch of chocolate or vanilla. The SuperCoffee was
            the first to be developed especially for Brazilians.
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;

const DURATION = 0.25;
const STAGGER = 0.025;

const AnimatedText = ({children}) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative inline-flex overflow-hidden whitespace-nowrap uppercase italic"
    >
      <div>
        {children.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: '-100%',
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0">
        {children.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: '100%',
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
