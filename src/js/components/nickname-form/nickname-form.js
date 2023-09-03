/**
 * The nickname-form web component module.
 *
 * @author Johanna Stenbeck <js226rv@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement("template");
template.innerHTML = `
  <style>
  #nickname {
    width: 200px;
    height: auto;
    border: 1px solid #fff;
    text-align: center;
    font-size: 14px;
    margin: auto;
    border-radius: 10px;
  }

  label {
    color: #fff;
    display: block;
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  input, button {
    font-family: Helvetica, Sans-Serif;
    border-radius: 0px;
    border: 0;
    background: rgba(0,0,0,0);
    color: #fff;
    width: 100%;
    height: 100%;
    padding: 5px;
    margin: 0;
    text-align: center;
    box-sizing: border-box;
  }

  input:focus {
    outline: 0;
  }

  ::placeholder {
    color: rgba(255,255,255,0.3);
    font-style: italic;
  }

  #nickname-save {
    background: rgba(0,0,0,0);
    border-top: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 0 0 10px 10px;
  }
  </style>
  <form id="nickname">
    <label>Enter your name</label>
    <input id="nickname-input" type="text" placeholder="Your name" autofocus required>
    <button id="nickname-save" type="submit">Submit</button>
  </form>
`;

customElements.define(
  "nickname-form",
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * The nickname element.
     *
     * @type {HTMLFormElement}
     */
    #nicknameElement;

    /**
     * The nickname label.
     *
     * @type {HTMLLabelElement}
     */
    #nicknameLabel;

    /**
     * The nickname input field.
     *
     * @type {HTMLLabelElement}
     */
    #nickname;

    /**
     * The nickname submit button.
     *
     * @type {HTMLLabelElement}
     */
    #nicknameSubmit;

    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super();

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: "open" }).appendChild(
        template.content.cloneNode(true)
      );

      // Get the nickname elements in the shadow root.
      this.#nicknameElement = this.shadowRoot.querySelector("#nickname");
      this.#nicknameLabel = this.shadowRoot.querySelector("label");
      this.#nickname = this.shadowRoot.querySelector("#nickname-input");
      this.#nicknameSubmit = this.shadowRoot.querySelector("#nickname-save");
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#nicknameElement.addEventListener("submit", (event) =>
        this.#saveNickname(event)
      );
    }

    /**
     * Prevents the submit default action, updates the nickname element and
     * fires an event with the submitted nickname as detail.
     *
     * @param {event} event contains data of the fired event.
     */
    #saveNickname(event) {
      event.preventDefault();

      this.#nicknameLabel.textContent = "Change name";

      this.dispatchEvent(
        new CustomEvent("nickname-submitted", {
          detail: {
            nickname: this.#nickname.value,
            buttontext: event.target[1].textContent,
          },
        })
      );

      this.#nickname.value = "";
      this.#nicknameSubmit.textContent = "Change";
    }
  }
);
