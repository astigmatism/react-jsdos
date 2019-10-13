import React, { useState } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ResolutionData from './ResolutionData'

const ResolutionDropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const buttonComponents = ResolutionData.map(resolutionData => 

        <DropdownItem onClick={() => props.handleResolutionChange(resolutionData.width, resolutionData.height)}>{resolutionData.width} x {resolutionData.height}</DropdownItem>
    )

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
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