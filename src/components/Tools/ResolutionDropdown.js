import React, { useState } from 'react'
import './ToolTray.css'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ResolutionConfiguration from '../App/Conf/ResolutionConfiguration'

const ResolutionDropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const buttonComponents = ResolutionConfiguration.map(resolutionData => 

        <DropdownItem key={resolutionData.id} onClick={() => props.handleResolutionChange(resolutionData.width, resolutionData.height)}>{resolutionData.width} x {resolutionData.height}</DropdownItem>
    )

  return (
    <ButtonDropdown className='tooltraybutton' isOpen={dropdownOpen} toggle={toggle} size="sm">
      <DropdownToggle caret>
        Resolution
      </DropdownToggle>
      <DropdownMenu>
        {buttonComponents}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default ResolutionDropdown;