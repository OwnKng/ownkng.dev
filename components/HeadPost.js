export const HeadPost = ({ meta, isBlogPost }) => (
  <>
    <h1 className={isBlogPost ? "great-title" : null}>{meta.title}</h1>
    <div className='details'>
      {isBlogPost ? null : <p>{meta.description}</p>}
      <span>{meta.date}</span>
    </div>
  </>
);
