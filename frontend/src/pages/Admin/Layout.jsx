import AdminNavbar from '../../components/Admin/AdminNavbar.jsx'
import AdminSidebar from '../../components/Admin/AdminSidebar.jsx'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'
import { useEffect } from 'react'
import Loader from '../../components/Loader.jsx'

const Layout = () => {

  const {isAdmin, fetchIsAdmin } = useAppContext();

  useEffect(()=> {
    fetchIsAdmin();
  },[])


  return isAdmin ?  (
    <>
        <AdminNavbar />
        <div className='flex'>
            <AdminSidebar />
            <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    </>
  ) : (<Loader />)
  
}

export default Layout