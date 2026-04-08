// project imports
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent({ drawerOpen, onToggleDrawer }) {

  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Navigation drawerOpen={drawerOpen} onToggleDrawer={onToggleDrawer} />
        {drawerOpen && <NavCard />}
      </SimpleBar>
    </>
  );
}
