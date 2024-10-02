
import PromptCard from "./PromptCard";
import ImageModal from "./ImageModal";

const Profile = ({ name, desc, data, showModal, handleEdit, handleDelete, handleShowModal }) =>
{
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Prompt Library</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* <ImageModal
        show={showModal}
        handleShowModal={() => handleShowModal()}
        onClose={() => setShowModal(false)}
        prompt={"generate industrial looking house in the mountains surrounded by trees"}
      /> */}

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleShowModal={() => handleShowModal && handleShowModal(post)}
          />
        ))

        }
      </div>
    </section>
  )
}

export default Profile