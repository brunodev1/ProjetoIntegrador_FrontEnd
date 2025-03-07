import React from 'react';
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

//"CSS"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        //NÃO COLOQUE CORES AQUI:
        grow: {
            flexGrow: 1,
        },
        //Sanduíche de 3 linhas (o background dele é redondinho)
        menuButton: {
            marginRight: theme.spacing(2),
        },
        //Título (o background é um retângulo):
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            marginLeft: 100,
        },
        //O background é literalmente a caixinha retangular de pesquisa; O texto é o texto e a lupinha
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
            },          
        },
        //É só a lupa em si. Esse aqui também colore a cor da lupinha. O background é um quadrado.
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',  
        },
        //O background é literalmente a caixinha retangular de pesquisa, sem a caixinha; O texto é o texto sem a lupinha.
        inputRoot: {
            color: 'inherit',
        },
        //É a caixinha da lupa, envolvendo o background e o texto. Sinceramente não entendi a diferença para os anteriores.
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        //É o container da barra de pesquisa, incluindo a margem
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        //É pra mobile, são 3 pontinhos que abrem o login (eles são tipo o texto)
        //E o background é um container quadrado verde
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

//JAVASCRIPT

function Navbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Minha conta</MenuItem>
        <Link to="/login" className="text-decorator-none">
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Link>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
        <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary"></Badge>
            </IconButton>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
            <AccountCircle />
            </IconButton>
            <p>Perfil</p>
        </MenuItem>
    </Menu>
    );

//"HTML"

return (
    <div className={classes.grow}>
        {/*Aqui dá pra mudar a cor do background da barra toda, fora todos os textos: */}
        <AppBar position="static">
            {/*Aqui também dá pra mudar a cor do background da barra toda, fora todos os textos: */}
            <Toolbar>
                {/*Aqui é o hamburguinho. As linhas mudam em "color" e o background é um redondinho: */}
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    {/*Aqui é o hamburguinho também, mas o background é um quadrado bem rente: */}
                    <MenuIcon />
                </IconButton>

                {/*Aqui é o título: */}
                <Typography className={classes.title} variant="h6" noWrap>
                    Refúgio da Moda
                </Typography>
                <Link to="/categorias">
                <Typography className={classes.title} variant="h6" noWrap>
                    Listar Categorias
                </Typography>
                </Link>
                <Link to="/formularioCategoria">
                <Typography className={classes.title} variant="h6" noWrap>
                    Cadastrar Categorias
                </Typography>
                </Link>

                <Link to="/produtos">
                <Typography className={classes.title} variant="h6" noWrap>
                    Listar Produtos
                </Typography>
                </Link>     

                <Link to="/formularioProduto">
                <Typography className={classes.title} variant="h6" noWrap>
                    Cadastrar Produtos
                </Typography>
                </Link>                
                



                <div className={classes.grow} />

                    <div className={classes.sectionDesktop}>
                        {/*Esse aqui é o container da lupinha, mas o background em formato oval!!*/}
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {/*Aqui é a caixinha de pesquisa. O background é a caixinha de pesquisa em si: */}
                            <div className={classes.search}>
                                    
                                    {/*Aqui é só a lupinha*/}
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    {/*Aqui é a cainha de pesquisa, mas só ela, sem a lupinha:*/}
                                    <InputBase
                                        placeholder="Pesquise aqui..."
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                {/*Aqui é o bonequinho do login: */}
                            <AccountCircle/>
                            </IconButton>                 
                        </div>
                                                    
                                                    
                                                    <div className={classes.sectionMobile}>
                                                        <IconButton
                                                            aria-label="show more"
                                                            aria-controls={mobileMenuId}
                                                            aria-haspopup="true"
                                                            onClick={handleMobileMenuOpen}
                                                            color="inherit"
                                                        >
                                                        {/*Aqui eu não entendi, mudar a cor dá erro: */}
                                                        <MoreIcon />
                                                        </IconButton>
                                                    </div>

            </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
    </div>
);
}

export default Navbar;