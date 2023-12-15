import { NavLink } from 'react-router-dom';

export function MyJobs() {
    return (
        <div>
            <h1>My Jobs</h1>
            <NavLink to={'/'}>
                homes
            </NavLink>
        </div>
    );
}
