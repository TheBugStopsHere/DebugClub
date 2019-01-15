import React from 'react';

export const AboutUs = () => {
    return (
        <div>
            <h1>Hello World!</h1>
            <img src="/img/group.jpeg" id="credit cards" height={500} />
            <br />
            <br />

            {/* NAMES SHOULD MATCH THE ORDER OF THE PHOTO */}
            <h2>Our names are <a href="https://www.linkedin.com/in/prestonwallace/">Preston Wallace</a>, <a href="https://www.linkedin.com/in/colleenrisso/">Colleen Risso</a>, <a href="https://www.linkedin.com/in/carolyn-campbell/">Carolyn Campbell</a>, and <a href="https://github.com/jacobRosen">Jacob Rosen</a>. </h2>

            <h4>We hope you are enjoying our site, and its many puns. We are new developers, and while many of these technologies are still new to us, user authentication and authorization is brand new! We had 9 days to fully plan and execute this website together.</h4> 
            <img src="/img/about1.jpeg" id="credit cards" height={300} />

            <h4>One of the most interesting aspects of this website was that the project was so open-ended, we constantly found ourselves having to evaluate what our needs actually where and having to restructure our priorities. </h4>
            <img src="/img/about3.jpg" id="credit cards" height={300} />

            <h3>We want to highlight the features we have spent so much time putting into our website:</h3>
            <h4>
                <ul>
                    <li>A user can sign up and will be able to log in each time they return.</li>
                    <li>Even if a user does not sign up, the site will still remember them.</li>
                    <li>A user's cart will not disappear, even if they refresh the page or have not visited the site. for a while. This is true for both logged-in users and guests. </li>
                    <li>A user's personal information, other than an email, is not required to sign up. A logged in user can update their personal information and login information.</li>
                    <li>A user can access their order history and an admin user can access all order histories.</li>
                    <li>The database tracks inventory and a user can purchase items in multiple quantities. If an item is out of stock, a user will be unable to add that item to their cart.</li>
                    <li>All users can checkout, and a guest user will <strong>not</strong> be required to sign in before checking out.</li>
                    <li>Admin users can adjust inventory and users profile information, as well as their own information.</li>
                </ul>
            </h4>
            
            <img src="/img/about2.jpeg" id="credit cards" height={300} />

            <h3>We would love for you to test out our site!</h3>
            <a href="https://github.com/TheBugStopsHere/DebugClub"> Check Out Our Code Here! </a>

            <br />
            <br />
            
            
        </div>
    )
}