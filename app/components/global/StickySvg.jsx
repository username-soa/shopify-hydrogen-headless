import Container from '../ui/Container';
import LogoIcon from '../icons/LogoIcon';

const StickySvg = () => {
  return (
    <Container className="sticky bottom-0 z-[1]">
      <LogoIcon className="p-6 mb-6 border-b border-r border-l border-gray-200" />
    </Container>
  );
};

export default StickySvg;
