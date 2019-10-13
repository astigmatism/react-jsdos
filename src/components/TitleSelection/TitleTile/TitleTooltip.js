//https://reactstrap.github.io/components/tooltips/
import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const TitleTooltip = (props) => {

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  let delay = {
    show: 500,
    hide: 10
  }

  return (
      <Tooltip placement='top' isOpen={tooltipOpen} target={'titletile_' + props.iteration} toggle={toggle} delay={delay}>
        {props.data.title} ({props.data.year})
      </Tooltip>
  )
}

export default TitleTooltip