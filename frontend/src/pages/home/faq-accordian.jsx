import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQAccordion() {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the Event Management System?</AccordionTrigger>
            <AccordionContent>
              Our Event Management System is a comprehensive platform that connects event organizers, attendees, and
              service providers. It allows users to purchase tickets for events, provides clients with tools to list and
              manage their events, and enables vendors to participate in tender filing for event services. The entire
              system is monitored and managed by administrators to ensure smooth operations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What types of users can access the system?</AccordionTrigger>
            <AccordionContent>
              Our platform supports four types of users:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Users:</strong> Individuals who browse events and purchase tickets
                </li>
                <li>
                  <strong>Clients:</strong> Event organizers who create and list events on the platform
                </li>
                <li>
                  <strong>Vendors:</strong> Service providers who can file tenders for event services
                </li>
                <li>
                  <strong>Administrators:</strong> Internal team members who manage and monitor the platform
                </li>
              </ul>
              Each user type has a dedicated registration process and dashboard tailored to their specific needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How do I purchase tickets for an event?</AccordionTrigger>
            <AccordionContent>
              Purchasing tickets is simple:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>
                  Browse available events or use our search and filter options to find events by category or location
                </li>
                <li>Select the event you're interested in to view details</li>
                <li>Choose the number of tickets you wish to purchase</li>
                <li>Proceed to checkout where you'll be directed to our secure payment gateway (Razorpay)</li>
                <li>Complete your payment</li>
                <li>Receive a confirmation and your tickets via email</li>
              </ol>
              Our system ensures secure transactions and immediate ticket delivery after successful payment.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>I'm an event organizer. How do I list my event?</AccordionTrigger>
            <AccordionContent>
              To list your event as a client:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Register or log in to your client account</li>
                <li>Navigate to your dashboard and select "Create New Event"</li>
                <li>
                  Fill in the required details including:
                  <ul className="list-disc pl-5 mt-1 mb-1">
                    <li>Event Name</li>
                    <li>Date and Time</li>
                    <li>Venue</li>
                    <li>Location</li>
                    <li>Description</li>
                    <li>Event Thumbnail</li>
                    <li>Ticket cost</li>
                  </ul>
                </li>
                <li>Review and publish your event</li>
              </ol>
              Once published, your event will be visible to all users browsing the platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>How can I search for specific events?</AccordionTrigger>
            <AccordionContent>
              Our platform offers comprehensive search and filter options:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Use the search bar to find events by name or keywords</li>
                <li>Filter events by category to find specific types of events</li>
                <li>Filter by location to find events near you</li>
                <li>Sort results by date, popularity, or price</li>
              </ul>
              These tools help you quickly find events that match your interests and preferences.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>Can I use the platform on my mobile device?</AccordionTrigger>
            <AccordionContent>
              Yes, our Event Management System is fully responsive and designed to work seamlessly across all devices:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Access the platform through any modern web browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Enjoy a responsive design that adapts to your screen size</li>
                <li>
                  Perform all functions including browsing events, purchasing tickets, and managing accounts on mobile
                </li>
                <li>Experience fast loading times and smooth navigation on all devices</li>
              </ul>
              Whether you're using a desktop, tablet, or smartphone, you'll have full access to all platform features.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>How do I recover my password if I forget it?</AccordionTrigger>
            <AccordionContent>
              Password recovery is simple:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Click on the "Forgot Password" link on the login page</li>
                <li>Enter the email address associated with your account</li>
                <li>Check your email for a password reset link</li>
                <li>Click the link and follow the instructions to create a new password</li>
                <li>Use your new password to log in</li>
              </ol>
              For security reasons, password reset links expire after a short period. If you don't reset your password
              in time, you'll need to request a new link.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
