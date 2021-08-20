import styled from 'styled-components';
import propTypes from "prop-types"

/**
 * @description
 * styled-component flex centered div 
 * @component
 * @example
 * <Container>
 *     {"content"}
 * </Container>
 */

const Container = styled.div`
display: flex;
justify-content: center;
align-content: center;
`

Container.propTypes = {
    /** Your name! */
    name: propTypes.name,
  }


export default Container
