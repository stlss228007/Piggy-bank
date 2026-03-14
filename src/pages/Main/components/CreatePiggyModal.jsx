import Modal from '../../../components/Modal/Modal'
import CreatePiggyForm from '../../../components/CreatePiggyForm/CreatePiggyForm'
import piggyImage from '../../../assets/images/piggy-bank.png'

function CreatePiggyModal({ isOpen, onClose, onCreate, isCreating }) {
    const handleSubmit = async (formData) => {
        try {
            await onCreate(formData)
        } catch (error) {
            throw error
        }
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Новая цель"
            image={piggyImage}
        >
            <CreatePiggyForm 
                onSubmit={handleSubmit}
                onCancel={onClose}
            />
        </Modal>
    )
}

export default CreatePiggyModal