import React, { Component } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      WebkitTransform       : 'translate(-50%, -50%)',
      msTransform           : 'translate(-50%, -50%)',
      textAlign             : 'center',
      border                : 'none',
    },
    overlay: {
        zIndex: 1000,
        overflow :'auto',
        marginTop: '7rem !important',
    },
    responsiveImage:{
        width: '100%',
        maxWidth: '200px',
        height: 'auto',
    },
};

class ConfirmationModal extends Component {

    constructor(props) {
        super(props);

        this.setConfirmation = this.setConfirmation.bind(this);
    }

    setConfirmation(confirmationAnswer){
        console.log(confirmationAnswer)
        this.props.toggleConfirmationModal(confirmationAnswer);
    }
    
    render() {

        const { showConfirmationModal, toggleConfirmationModal} = this.props;
        return (
            <div>
                <ReactModal
                    isOpen={showConfirmationModal}
                    contentLabel="Confirm an action"
                    style={customStyles}
                    onRequestClose={toggleConfirmationModal}
                >
                    <h4>Are you sure you want to delete it?</h4>
                    <button type="button" onClick={()=>{ this.setConfirmation(true)}}>Yes</button>
                    <button type="button" onClick={()=>{ this.setConfirmation(false)}}>No</button>
                </ReactModal>
            </div>
        );
    }
}

export default ConfirmationModal;