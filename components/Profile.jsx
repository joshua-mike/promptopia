import PromptCard from "./PromptCard";
import ImageModal from "./ImageModal";

const Profile = ({ name, desc, currentPost, data, showModal, onClose, handleEditWrapper, handleDeleteWrapper, handleShowModalWrapper }) =>
{
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Prompt Library</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <ImageModal
        show={showModal}
        onClose={onClose}
        prompt={currentPost?.prompt}
      />

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEditWrapper(post)}
            handleDelete={handleDeleteWrapper(post)}
            handleShowModal={handleShowModalWrapper(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile