import { MemoryRouter } from 'react-router-dom';
import { ContentContext } from '../src/context/ContentContext';
import mockContent from './mockContent.json';

/**
 * Supplies the same shape of data ContentProvider would fetch from the API,
 * but synchronously and with no network call — so stories render instantly
 * and don't need the backend running.
 */
function MockContentProvider({ children }) {
  return (
    <ContentContext.Provider value={mockContent}>
      {children}
    </ContentContext.Provider>
  );
}

/**
 * Every component in this app can end up needing router context (NavLink,
 * useNavigate, etc.) and content context (useContent). Wrapping every story
 * in both means individual stories don't need to think about either.
 */
export function AppDecorator(Story) {
  return (
    <MemoryRouter initialEntries={['/']}>
      <MockContentProvider>
        <Story />
      </MockContentProvider>
    </MemoryRouter>
  );
}
