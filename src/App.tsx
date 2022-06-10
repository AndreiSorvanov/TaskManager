import './App.css';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { TasksList } from './components/TasksList';
import { Title } from './components/Title';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './store';
import { CreateButton } from './components/TasksList/Task/CreateButton';

const store = configureStore({ reducer: rootReducer });

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Content>
          <div className='content'>
            <Title title={'Список задач'} />
            <CreateButton />
          </div>
          <TasksList />
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
