import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LanguageDropdown from '../components/LanguageDropdown';
import { setLocale } from 'react-redux-i18n';


const mapStateToProps = state => {
    return {
        currentLocale: state.i18n.locale,
        availableLocales: Object.keys(state.i18n.translations)
    }
};

const mapDispatchToActions = dispatch => (
    bindActionCreators({ setLocale }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToActions)(LanguageDropdown)