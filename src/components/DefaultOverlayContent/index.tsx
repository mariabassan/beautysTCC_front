import React from 'react'

import { Container, Heading, Buttons } from './styles'

interface Props {
  label: string
  description: string
}

const DefaultOverlayContent: React.FC<Props> = ({ label, description }) => {
  return (
    <Container>
      <Heading>
        <h1>{label}</h1>
        <h2>{description}</h2>
      </Heading>

      <Buttons>
        <button>Acessar página</button>
        <button className="white" onClick={event =>  window.location.href='/dashboard3'}>Home</button>
      </Buttons>
    </Container>
  )
}

export default DefaultOverlayContent