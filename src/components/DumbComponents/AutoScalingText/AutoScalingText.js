import React, { useState, useEffect, useRef } from "react";

export class AutoScalingText extends React.Component {
    state = {
      scale: 1
    };
    
    componentDidUpdate() {
      const { scale } = this.state
      
      const node = this.node
      const parentNode = node.parentNode
      
      const availableWidth = parentNode.offsetWidth
      const actualWidth = node.offsetWidth
      const actualScale = availableWidth / actualWidth
      
      if (scale === actualScale)
        return
      
      if (actualScale < 1) {
        this.setState({ scale: actualScale })
      } else if (scale < 1) {
        this.setState({ scale: 1 })
      }
    }
    
    render() {
      const { scale } = this.state
      
      return (
        <div
          className="auto-scaling-text"
          style={{ transform: `scale(${scale},${scale})` }}
          ref={node => this.node = node}
        >{this.props.children}</div>
      )
    }
  }

// export const AutoScalingText = (props) => {
//     // state = {
//     //   scale: 1
//     // };

//     const [ scale, setScale ] = useState(0);
//     const ref = useRef<any>(null);

//     useEffect(() => {
//       console.log('n' ,ref);
//       const parentNode = ref.parentNode
//       const availableWidth = parentNode.offsetWidth
//       const actualWidth = ref.offsetWidth
//       const actualScale = availableWidth / actualWidth
      
//       if (scale === actualScale)
//         return
      
//       if (actualScale < 1) {
//         setScale(actualScale);
//       } else if (scale < 1) {
//         setScale(1);
//       }
//     }, [scale]);

//     // const [height, setHeight] = useState(null);
//     // const [width, setWidth] = useState(null);
//     // const div = useCallback(node => {
//     //   if (node !== null) {
//     //     setHeight(node.getBoundingClientRect().height);
//     //     setWidth(node.getBoundingClientRect().width);
//     //   }
//     // }, []);

//     return (
//       <div
//           className="auto-scaling-text"
//           style={{ transform: `scale(${scale},${scale})` }}
//       >
//           { props.children }
//       </div>
//     );
// }