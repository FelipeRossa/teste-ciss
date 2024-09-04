import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

const Menu = () => {
    const getActiveRoute = useLocation().pathname ? 'Active' : '';
    return (
        <Navbar bg="dark" expand="lg" className="navbar-expand-lg bg-primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to={'/'}>CISS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>

                        <Nav.Link 
                            className={getActiveRoute}
                            as={NavLink} 
                            to={'/funcionario/lista'}>
                            Funcionários
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Menu;