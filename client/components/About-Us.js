import React from 'react'

export const AboutUs = () => {
  return (
    <div id="aboutUsContainer">
      <h1 id="helloWorld">Hello World!</h1>
      <img
        className="aboutUsPics"
        id="devs"
        src="/img/developers.jpg"
        height={500}
      />
      <br />
      <br />
      <h4 className="aboutUsContent">
        Our names are{' '}
        <a className="devNames" href="https://github.com/jacobRosen">
          Jacob Rosen
        </a>,{' '}
        <a
          className="devNames"
          href="https://www.linkedin.com/in/carolyn-campbell/"
        >
          Carolyn Campbell
        </a>,{' '}
        <a
          className="devNames"
          href="https://www.linkedin.com/in/colleenrisso/"
        >
          Colleen Risso
        </a>, and{' '}
        <a
          className="devNames"
          href="https://www.linkedin.com/in/prestonwallace/"
        >
          Preston Wallace
        </a>.
      </h4>

      <h4 className="aboutUsContent">
        We hope you are enjoying our site, and its many puns! We are new
        developers in our final phase of a software engineering immersive
        bootcamp with{' '}
        <a id="fsLink" href="https://www.fullstackacademy.com/">
          Fullstack Academy
        </a>. While some technologies are still new to us, we are proud of this
        "full-stack" accomplishment. We had 9 days to fully plan and execute
        this website together.
      </h4>
      <img className="aboutUsPics" src="/img/itemsSchema.jpg" height={500} />

      <h3>Highlights:</h3>
      <h4 className="aboutUsContent">
        <ul>
          <li>
            A user can sign up and will be able to log in each time they return.
          </li>
          <li>
            Even if a user does not sign up, the site will still remember them.
          </li>
          <li>
            A user's cart will not disappear, even if they refresh the page or
            have not visited the site. for a while. This is true for both
            logged-in users and guests.{' '}
          </li>
          <li>
            A user's personal information, other than an email, is not required
            to sign up. A logged in user can update their personal information
            and login information.
          </li>
          <li>
            A user can access their order history and an admin user can access
            all order histories.
          </li>
          <li>
            The database tracks inventory and a user can purchase items in
            multiple quantities. If an item is out of stock, a user will be
            unable to add that item to their cart.
          </li>
          <li>
            All users can checkout, and a guest user will <strong>not</strong>{' '}
            be required to sign in before checking out.
          </li>
          <li>
            Admin users can adjust inventory and users profile information, as
            well as their own information.
          </li>
        </ul>
      </h4>

      <img className="aboutUsPics" src="/img/checkoutSchema.jpg" height={500} />

      <h3>We would love for you to test out our site!</h3>
      <a id="github" href="https://github.com/TheBugStopsHere/DebugClub">
        {' '}
        Check Out Our Code!{' '}
      </a>

      <br />
      <br />
    </div>
  )
}
