import React, { useCallback, useRef, ChangeEvent } from 'react';
import {FiType, FiX, FiLock, FiCamera} from 'react-icons/fi';
import {TiSortNumerically} from 'react-icons/ti';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { Container, Content, AvatarInput, Section} from './styles';

import userIcon from '../../assets/user2.png'
import logoImg from '../../assets/logo.png';
import Menu from '../../components/menu/Navbar';

interface CadColabFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  procedure_id: string;
}

const CadColab: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  //const { user } = useAuth();

  const handleSubmit = useCallback(
    async (data: CadColabFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().required('E-mail é obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          phone: Yup.string().required('Telefone é obrigatório'),
          procedure_id: Yup.string(),
          estab_id: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/cooperator', data);
        console.log(data);
        history.push('/colaboradores');

        addToast({
          type: 'success',
          title: 'Cadastro do colaborador realizado!',
          description: 'BeautyScheduler!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        /*addToast({
          type: 'success',
          title: 'Cadastro do colaborador realizado!',
          description: 'BeautyScheduler!',
        })*/
        addToast({
          type: 'error',
          title: 'Erro no cadastro do colaborador',
          description: 'Ocorreu um erro ao realizar o cadastro, tente novamente.',
        });
        //history.push('/dashboard');
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/cooperator/avatar', data).then((response: any) => {

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Menu/>
      <Section>
      <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de colaboradores</h1>

            <AvatarInput>
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
            </AvatarInput>

            <Input name="name" icon={FiType} placeholder="Nome Completo" />
            <Input name="email" icon={FiType} placeholder="E-Mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input name="phone" icon={TiSortNumerically} placeholder="Telefone" />
            <Input name="procedure_id" icon={FiType} placeholder="Procedimento principal" />
            <Input name="estab_id" icon={FiType} placeholder="Estabelecimento" />

            <Button type="submit">Salvar<Link to="/colaboradores"></Link></Button>
          </Form>

          <Link to="/colaboradores">
            <FiX />
            Cancelar
          </Link>

      </Content>
      </Section>
    </Container>
  );
};

export default CadColab;
/*<img
  src={
    userIcon
  }
  alt={"FOTO"}
  />*/