import { configureStore } from '@reduxjs/toolkit';
import openAIKeyReducer from '@/store/openAIApiSlice';

const store = configureStore({
  reducer: { openAIKeyReducer },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
