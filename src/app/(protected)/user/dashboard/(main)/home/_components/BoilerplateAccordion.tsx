import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const BoilerplateAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="feature-overview">
        <AccordionTrigger>
          What features does this boilerplate offer?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            This boilerplate includes a comprehensive setup for a modern web
            application using Next.js, AuthJS for authentication, Tailwind CSS
            for styling, and ShadCN for UI components. It also features a fully
            responsive design, 3D card components, and more.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="getting-started">
        <AccordionTrigger>
          How do I get started with this boilerplate?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            To get started, clone the repository from GitHub, install the
            dependencies using your preferred package manager, and run the
            development server. Detailed instructions can be found in the README
            file of the repository.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="customization">
        <AccordionTrigger>How can I customize the components?</AccordionTrigger>
        <AccordionContent>
          <p>
            Customizing components is straightforward with this boilerplate.
            Each component is built with modularity in mind. You can modify the
            existing components or add new ones by following the structure and
            guidelines provided. Tailwind CSS makes it easy to apply custom
            styles.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="support">
        <AccordionTrigger>Where can I get support?</AccordionTrigger>
        <AccordionContent>
          <p>
            For support, you can reach out to the community through GitHub
            issues or join our Discord server. Additionally, you can refer to
            the documentation and FAQ sections for common questions and
            troubleshooting tips.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BoilerplateAccordion;
