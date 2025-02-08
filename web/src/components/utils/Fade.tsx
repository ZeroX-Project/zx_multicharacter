import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { cn } from '../../utils/misc';

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
    <CSSTransition in={props.in} nodeRef={nodeRef} classNames={cn(`transition-all duration-1000 ease-in-out `, animate)} timeout={200} unmountOnExit>
      <span ref={nodeRef}>
        <div className="absolute inset-0">
          <div className="relative h-full w-full [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[radial-gradient(circle_at_center,transparent,#000000)] [&>div]:opacity-50 [&>div]:mix-blend-multiply">
            <div></div>
          </div>
        </div>
        <div className="relative z-10">{props.children}</div>
      </span>
    </CSSTransition>
  );
};

export default Fade;
