import styled from "styled-components";
import { elevation } from "../utilities";

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    justify-content: flex-start;
    place-items: center;
    margin-bottom: 0px;
  }

  p {
    margin: 5px;
    padding: 0.5rem 1rem;
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
    ${elevation[2]};
  }

  button:focus {
    outline: none;
  }
`;

const Form = ({ tags, active, setActive }) => {
  return (
    <StyledForm>
      <div>
        <p>Filter</p>
      </div>
      <div className='buttons'>
        <button
          style={{
            background: active === "Featured" ? "#00A7E1" : "",
            color: active === "Featured" ? "white" : "",
          }}
          onClick={() => setActive("Featured")}
        >
          Featured
        </button>
        {tags
          ? tags.map((tag) => (
              <button
                key={tag}
                style={{
                  background: tag === active ? "#00A7E1" : "",
                  color: tag === active ? "white" : "",
                }}
                onClick={() => setActive(tag)}
              >
                {tag}
              </button>
            ))
          : null}
      </div>
    </StyledForm>
  );
};

export default Form;
