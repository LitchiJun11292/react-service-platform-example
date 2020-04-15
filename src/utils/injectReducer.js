import store from '../store/configureStore';

export default ({ key, reducer }) => (WrappedComponent) => {
    store.injectReducer(key, reducer);
    return WrappedComponent;
}
