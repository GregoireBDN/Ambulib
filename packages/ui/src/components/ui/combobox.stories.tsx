import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Combobox, ComboboxItem } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Autocomplete input and command palette with a list of suggestions. Built using Popover and Command components."
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "Array of items to display in the combobox",
      control: "object"
    },
    value: {
      description: "The selected value",
      control: "text"
    },
    placeholder: {
      description: "Placeholder text when no item is selected",
      control: "text"
    },
    searchPlaceholder: {
      description: "Placeholder text for the search input",
      control: "text"
    },
    emptyMessage: {
      description: "Message to display when no items are found",
      control: "text"
    },
    disabled: {
      description: "Whether the combobox is disabled",
      control: "boolean"
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const frameworks: ComboboxItem[] = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" }
];

const languages: ComboboxItem[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "php", label: "PHP" }
];

const medicalSpecialties: ComboboxItem[] = [
  { value: "cardiology", label: "Cardiologie" },
  { value: "neurology", label: "Neurologie" },
  { value: "emergency", label: "Médecine d'urgence" },
  { value: "orthopedics", label: "Orthopédie" },
  { value: "pediatrics", label: "Pédiatrie" },
  { value: "geriatrics", label: "Gériatrie", disabled: true },
  { value: "psychiatry", label: "Psychiatrie" }
];

// Story avec état non-contrôlé (le composant gère son propre état)
export const Default: Story = {
  args: {
    items: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyMessage: "No framework found."
  }
};

// Story avec état contrôlé
export const WithSelectedValue: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("next.js");
    return (
      <Combobox
        items={args.items}
        placeholder={args.placeholder}
        searchPlaceholder={args.searchPlaceholder}
        value={value}
        onValueChange={setValue}
      />
    );
  },
  args: {
    items: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework..."
  }
};

// Story interactive pour tester la sélection
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div className="space-y-4">
        <Combobox
          items={args.items}
          placeholder={args.placeholder}
          searchPlaceholder={args.searchPlaceholder}
          emptyMessage={args.emptyMessage}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-muted-foreground">
          Valeur sélectionnée: <strong>{value || "Aucune"}</strong>
        </p>
      </div>
    );
  },
  args: {
    items: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyMessage: "No framework found."
  },
  parameters: {
    docs: {
      description: {
        story: "Story interactive pour tester la sélection avec affichage de la valeur."
      }
    }
  }
};

export const Languages: Story = {
  args: {
    items: languages,
    placeholder: "Choose a programming language...",
    searchPlaceholder: "Search languages...",
    emptyMessage: "No language found."
  },
  parameters: {
    docs: {
      description: {
        story: "Example with programming languages selection."
      }
    }
  }
};

export const MedicalContext: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div className="space-y-4">
        <Combobox
          items={args.items}
          placeholder={args.placeholder}
          searchPlaceholder={args.searchPlaceholder}
          emptyMessage={args.emptyMessage}
          value={value}
          onValueChange={setValue}
        />
        <div className="text-sm text-muted-foreground">
          <p>Spécialité sélectionnée: <strong>{value ? medicalSpecialties.find(s => s.value === value)?.label || value : "Aucune"}</strong></p>
          {value === "geriatrics" && (
            <p className="text-yellow-600">⚠️ Cette spécialité est temporairement indisponible</p>
          )}
        </div>
      </div>
    );
  },
  args: {
    items: medicalSpecialties,
    placeholder: "Sélectionner une spécialité...",
    searchPlaceholder: "Rechercher une spécialité...",
    emptyMessage: "Aucune spécialité trouvée."
  },
  parameters: {
    docs: {
      description: {
        story: "Example in medical context with French labels, disabled options and state feedback."
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    items: frameworks,
    disabled: true,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework..."
  },
  parameters: {
    docs: {
      description: {
        story: "Combobox in disabled state."
      }
    }
  }
};

export const CustomWidth: Story = {
  args: {
    items: frameworks,
    placeholder: "Select framework...",
    className: "w-[300px]"
  },
  parameters: {
    docs: {
      description: {
        story: "Combobox with custom width using className."
      }
    }
  }
};

export const EmptyState: Story = {
  args: {
    items: [],
    placeholder: "No items available...",
    searchPlaceholder: "Search...",
    emptyMessage: "No items to display."
  },
  parameters: {
    docs: {
      description: {
        story: "Combobox with empty items array to demonstrate empty state."
      }
    }
  }
};

export const LongList: Story = {
  args: {
    items: [
      ...frameworks,
      ...languages,
      { value: "html", label: "HTML" },
      { value: "css", label: "CSS" },
      { value: "sass", label: "Sass/SCSS" },
      { value: "less", label: "Less" },
      { value: "stylus", label: "Stylus" },
      { value: "tailwind", label: "Tailwind CSS" },
      { value: "bootstrap", label: "Bootstrap" },
      { value: "bulma", label: "Bulma" }
    ],
    placeholder: "Choose technology...",
    searchPlaceholder: "Search technologies...",
    emptyMessage: "No technology found."
  },
  parameters: {
    docs: {
      description: {
        story: "Combobox with a long list of items to demonstrate search functionality."
      }
    }
  }
};