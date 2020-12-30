import styled from "styled-components";

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  justify-content: space-evenly;
  place-items: center;
  margin-bottom: 0px;

  p {
    margin: 0px;
    color: ${({ theme }) => theme.colors.paragraph};
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};

  button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.colors.paragraph};
    color: ${({ theme }) => theme.colors.background};
    border-radius: 5px;
    border: none;
    margin: 5px;
  }

  button:focus {
    outline: none;
  }
`;

const Form = ({ tags, active, setActive }) => {
  return (
    <StyledForm>
      <p>Filter</p>
      <button
        style={{
          background: !active ? "#e53170" : "",
          color: !active ? "white" : "",
        }}
        onClick={() => setActive(false)}
      >
        All
      </button>
      <button
        style={{
          background: active === "Starred" ? "#e53170" : "",
          color: active === "Starred" ? "white" : "",
        }}
        onClick={() => setActive("Starred")}
      >
        &#9734; Starred
      </button>
      {tags
        ? tags.map((tag) => (
            <button
              key={tag}
              style={{
                background: tag === active ? "#e53170" : "",
                color: tag === active ? "white" : "",
              }}
              onClick={() => setActive(tag)}
            >
              {tag}
            </button>
          ))
        : null}
    </StyledForm>
  );
};

export default Form;
