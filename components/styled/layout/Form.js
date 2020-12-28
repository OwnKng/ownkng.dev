import styled from "styled-components";

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  justify-content: space-evenly;
  place-items: center;
  gap: 10px;

  h4 {
    margin: 0px;
    color: ${({ theme }) => theme.colors.paragraph};
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};

  button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    border-radius: 2px;
    border: none;
  }

  button:focus {
    outline: none;
  }
`;

const Form = ({ tags, active, setActive }) => {
  return (
    <StyledForm>
      <h4>Filter</h4>
      <button
        style={{ color: !active ? "black" : "" }}
        onClick={() => setActive(false)}
      >
        All
      </button>
      {tags
        ? tags.map((tag) => (
            <button
              key={tag}
              style={{ color: tag === active ? "black" : "" }}
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
