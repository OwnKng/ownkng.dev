import styled from "styled-components"

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

  button {
    position: relative;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    background: none;
    color: ${({ theme }) => theme.colors.paragraph};
    border: none;
    margin: 5px;

    :before {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: ${({ theme }) => theme.colors.button};
      visibility: hidden;
      transition: all 0.2s ease-in-out;
    }

    :hover:before {
      visibility: visible;
      width: 100%;
    }
  }

  button:focus {
    outline: none;
  }
`

const Form = ({ tags, active, setActive }) => {
  return (
    <StyledForm>
      <div className='buttons'>
        <div>
          <button
            style={{
              color: active === "Featured" ? "#00A7E1" : "",
            }}
            onClick={() => setActive("Featured")}
          >
            Featured
          </button>
        </div>

        {tags
          ? tags.map((tag) => (
              <div>
                <button
                  key={tag}
                  style={{
                    color: tag === active ? "#00A7E1" : "",
                  }}
                  onClick={() => setActive(tag)}
                >
                  {tag}
                </button>
              </div>
            ))
          : null}
      </div>
    </StyledForm>
  )
}

export default Form
