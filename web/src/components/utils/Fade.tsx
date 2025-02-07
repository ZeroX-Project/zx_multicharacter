import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  in?: boolean;
  children: React.ReactNode;
}

const Fade: React.FC<Props> = (props) => {
  const nodeRef = useRef(null);
  const [animate, setAnimate] = useState('opacity-0 translate-y-10');

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    setAnimate('opacity-100 translate-y-0');
  }, []);

  return (
    <CSSTransition in={props.in} nodeRef={nodeRef} classNames={`transition-all duration-1000 ease-in-out ${animate}`} timeout={200} unmountOnExit>
      <span ref={nodeRef}>{props.children}</span>
    </CSSTransition>
  );
};

export default Fade;
