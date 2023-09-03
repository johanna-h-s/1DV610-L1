/**
 * The hello-generator web component module.
 *
 * @author Johanna Stenbeck <js226rv@student.lnu.se>
 * @version 1.0.0
 */

import "../nickname-form/index.js";

// Define template.
const template = document.createElement("template");
template.innerHTML = `
  <style>
  #wrapper {
    width: 400px;
    max-width: 90%;
    height: auto;
    text-align: center;
    font-size: 14px;
    margin: auto;
    padding: 40px 0;
  }
  .nickname-message {
    margin-top: 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #fff;
    line-height: 150%;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #fff;
    color: #fff;
    padding: 5px;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 10px;
  }
  </style>
  <div id="wrapper">
    <div class="title">A SMALL HELLO</div>
    
    <nickname-form></nickname-form>
    
    <p class="nickname-message">&nbsp;</p>
  </div>
`;

customElements.define(
  "hello-generator",
  /**
   * Represents a hello-generator element.
   */
  class extends HTMLElement {
    /**
     * The wrapper element.
     *
     * @type {HTMLFormElement}
     */

    #wrapper;

    /**
     * The h1 element.
     *
     * @type {HTMLFormElement}
     */

    #nicknameMessage;

    /**
     * The nickname-form element.
     *
     * @type {HTMLFormElement}
     */
    #nicknameForm;

    /**
     * The submitted nickname.
     *
     * @type {string}
     */
    #nickname;

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

      // Get the elements in the shadow root.
      this.#wrapper = this.shadowRoot.querySelector("#wrapper");
      this.#nicknameMessage =
        this.shadowRoot.querySelector(".nickname-message");
      this.#nicknameForm = this.shadowRoot.querySelector("nickname-form");
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#nicknameForm.addEventListener("nickname-submitted", (event) => {
        this.#saveNickname(event);
      });
    }

    /**
     * Saves the players nickname.
     *
     * @param {event} event contains data of the fired event.
     */
    #saveNickname(event) {
      if (/^[a-zA-Z]+$/.test(event.detail.nickname)) {
        this.#nickname = event.detail.nickname;

        let greeting = this.#distortNickname(this.#nickname);

        this.#nicknameMessage.textContent = `Hello ${greeting}`;
      } else {
        this.#nicknameMessage.textContent =
          "Your name can only consist of the letters a-z (sorry Åsa, Ängla, Örjan and Øjvind).";
      }
    }

    /**
     * Distorts and returns the players nickname along with a message.
     *
     * @param {string} name the name to distort.
     */
    #distortNickname(name) {
      let newName = "";
      let message = "";
      let randomNumber = Math.floor(Math.random() * 3) + 1;

      // Change name to display in reverse.
      const nameInReverse = (name) => {
        // Change the letters of the name to display backwards.
        for (const c of name) {
          newName = c + newName;
        }

        message = ", as your name is spelled in reverse.";
      };

      // Change name to a saint-like one.
      const nameAsSaint = (name) => {
        newName = "St. " + name;

        message =
          ", as you'd been called if you'd done something great (and perhaps a bit bogus) for humanity.";
      };

      // Change name to display in rövarspråket.
      const nameInRovarspraket = (name) => {
        // Make the name display in rövarspråket.
        for (const c of name) {
          if (/^[aeiouAEIOU]$/.test(c)) {
            newName = newName + c;
          } else {
            newName = newName + c + "o" + c;
          }
        }

        message = ", as your name is pronounced in Rövarspråket.";
      };

      // Decide how to change name.
      switch (true) {
        case randomNumber === 1:
          nameInRovarspraket(name);
          break;
        case randomNumber === 2:
          nameAsSaint(name);
          break;
        case randomNumber === 3:
          nameInReverse(name);
          break;
        default:
          console.log("Oh no!");
      }

      return newName + message;
    }
  }
);
