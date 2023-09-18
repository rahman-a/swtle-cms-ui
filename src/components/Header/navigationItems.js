import {
  HomeIcon,
  BriefcaseIcon,
  GearIcon,
  EnvelopeIcon,
  TeamIcon,
  InfoIcon,
} from '../../icons'

export const links = [
  { id: 1, label: 'home', url: '/', icon: HomeIcon },
  {
    id: 2,
    label: 'services',
    url: '/services',
    icon: BriefcaseIcon,
    children: {
      individual: [
        {
          id: 1,
          label: 'services.prepayment_recording',
          url: '/services/payment-transactions-recording-and-tracking',
        },
        {
          id: 2,
          label: 'services.electronic_invoicing',
          url: '/services/electronic-invoicing',
        },
        {
          id: 3,
          label: 'services.credit_evaluation',
          url: '/services/credit-evaluation',
        },
        {
          id: 4,
          label: 'services.financing_solution',
          url: '/services/financing-solution',
        },
        {
          id: 5,
          label: 'services.debt_collection',
          url: '/services/debt-collection',
        },
        {
          id: 6,
          label: 'services.legal_recourse',
          url: '/services/legal-recourse',
        },
      ],
      business: [],
    },
  },
  {
    id: 3,
    label: 'how_it_works',
    url: '/how-it-works',
    icon: GearIcon,
  },
  {
    id: 4,
    label: 'our_team',
    url: '/team',
    icon: TeamIcon,
  },
  {
    id: 5,
    label: 'about_us',
    url: '/about-us',
    icon: InfoIcon,
  },
  {
    id: 6,
    label: 'contact_us',
    url: '/contact-us',
    icon: EnvelopeIcon,
  },
]
