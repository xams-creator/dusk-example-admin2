import './index.scss';
import Menu from './menu';
import Tree from './tree';

type CompoundedComponent = {
    Menu: typeof Menu;
    Tree: typeof Tree;
};

const Navigation = Menu as unknown as CompoundedComponent;

Navigation.Menu = Menu;
Navigation.Tree = Tree;
export default Navigation;
