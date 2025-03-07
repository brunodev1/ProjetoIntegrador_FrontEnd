import React, { useEffect, useState } from 'react'
import {Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import './DeletarProdutos.css';
import { buscaId, deleteId } from '../../../services/Service';
import { Box } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import Produto from '../../../model/Produto';

function DeletarProdutos() {
    let navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const [produto, setProduto] = useState<Produto>()
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
  )
  
    useEffect(() => {
        if(token == ""){
          toast.error('Você precissa estar logado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover:false,
            draggable: false,
            theme : "colored",
            progress: undefined,
           });
            navigate("/login")
        }
    }, [token])
  
    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])
  
    async function findById(id: string){
        buscaId(`/produtos/${id}`, setProduto,{
            headers:{
            'Authorization': token
           }
        })
    }
  
    function sim(){
      navigate('/produtos')
      deleteId(`/produtos/${id}`,{
        headers:{
          'Authorization': token
        }
      });
      toast.success('Produto deletado com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover:false,
        draggable: false,
        theme : "colored",
        progress: undefined,
       });
    }
  
    function nao(){
      navigate('/produtos')
    }
  
     
    return (
      <>
        <Box m={2}>
          <Card variant="outlined" >
            <CardContent>
              <Box justifyContent="center">
                <Typography color="textSecondary" gutterBottom>
                  Deseja deletar a Categoria:
                </Typography>
                <Typography color="textSecondary" >
                {produto?.nome}
                </Typography>
              </Box>
  
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
                </Box>
                <Box>
                <Button onClick={nao}  variant="contained" size='large' color="secondary">
                  Não
                </Button>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </>
    );
  }
  export default DeletarProdutos;