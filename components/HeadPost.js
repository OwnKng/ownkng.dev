export const HeadPost = ({ meta, isBlogPost }) => (
  <>
    <h1 className={isBlogPost ? "great-title" : null}>{meta.title}</h1>
    <div className='details'>
      <span>
        <p>{meta.description}</p>
      </span>
      <span>{meta.date}</span>
    </div>
  </>
);
