// components/faq-section.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const faqTutores = [
  {
    question: "O que é o Bitzy?",
    answer:
      "O Bitzy é um aplicativo gratuito criado para ajudar tutores a cuidarem melhor dos seus pets. No app você encontra um assistente com Inteligência Artificial, mapa de locais pet, clube de descontos e diversas ferramentas para facilitar o dia a dia.",
  },
  {
    question: "O Bitzy é gratuito?",
    answer: "Sim. O download e o uso do aplicativo são totalmente gratuitos para os tutores.",
  },
  {
    question: "O que posso fazer no aplicativo?",
    answer:
      "Você pode tirar dúvidas sobre seu pet usando IA, encontrar pet shops e clínicas próximas, descobrir promoções, participar do Clube Bitzy, receber dicas de cuidados e encontrar produtos e serviços para seu pet.",
  },
  {
    question: "Como funciona a Inteligência Artificial?",
    answer:
      "Você pode conversar com a IA e fazer perguntas sobre alimentação, comportamento, higiene, vacinas, medicamentos (informações gerais), primeiros cuidados, raças e muito mais. A IA não substitui um médico veterinário.",
  },
  {
    question: "A IA substitui um veterinário?",
    answer:
      "Não. A IA serve para orientar e informar. Em casos de urgência ou doenças, procure um veterinário imediatamente.",
  },
  {
    question: "O que é o Clube Bitzy?",
    answer:
      "É um clube de benefícios onde os tutores encontram descontos exclusivos em pet shops, clínicas veterinárias, banho e tosa, hotéis, creches e diversos parceiros.",
  },
  {
    question: "Como consigo descontos?",
    answer: "Basta apresentar o aplicativo ou seguir as instruções da oferta dentro do Bitzy.",
  },
  {
    question: "Preciso pagar mensalidade?",
    answer: "Não. O Bitzy é gratuito para os tutores.",
  },
  {
    question: "Posso cadastrar mais de um pet?",
    answer: "Sim. Você pode cadastrar quantos pets desejar.",
  },
  {
    question: "O aplicativo funciona em qualquer cidade?",
    answer:
      "Sim. Quanto mais empresas parceiras existirem na sua região, mais benefícios e estabelecimentos aparecerão para você.",
  },
  {
    question: "Como encontro um pet shop próximo?",
    answer:
      "Utilize o mapa do aplicativo para localizar pet shops, clínicas, hospitais veterinários, hotéis, parques e outros serviços.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim. O Bitzy utiliza tecnologias modernas para proteger suas informações.",
  },
  {
    question: "Posso avaliar estabelecimentos?",
    answer: "Sim. Sua avaliação ajuda outros tutores a encontrarem os melhores serviços.",
  },
  {
    question: "Como entro em contato com o suporte?",
    answer: "Você pode falar conosco diretamente pelo aplicativo ou através dos canais oficiais do Bitzy.",
  },
]

const faqPetShops = [
  {
    question: "O que é o sistema Bitzy?",
    answer:
      "É uma plataforma completa para gestão do pet shop e relacionamento com clientes, integrada ao aplicativo utilizado pelos tutores.",
  },
  {
    question: "O que está incluso?",
    answer:
      "Cadastro de clientes e pets, agenda de banho e tosa, agenda de vacinas, controle financeiro, contas a pagar e a receber, controle de estoque, CRM Inteligente, Marketplace B2B, Clube Bitzy e divulgação para milhares de tutores.",
  },
  {
    question: "Como o Bitzy ajuda a vender mais?",
    answer:
      "O sistema identifica automaticamente clientes que estão comprando acima da média, que diminuíram as compras ou que deixaram de comprar, permitindo agir antes de perder o cliente.",
  },
  {
    question: "O CRM realmente avisa quando um cliente está sumindo?",
    answer:
      "Sim. O CRM Inteligente monitora o histórico de compras e identifica automaticamente clientes em risco de abandono.",
  },
  {
    question: "O sistema sugere mensagens para WhatsApp?",
    answer:
      "Sim. A IA pode sugerir mensagens personalizadas para reconquistar clientes e aumentar o retorno ao estabelecimento.",
  },
  {
    question: "Posso controlar meu estoque?",
    answer: "Sim. O sistema possui controle completo de estoque com entradas, saídas e acompanhamento dos produtos.",
  },
  {
    question: "O sistema controla contas a pagar e receber?",
    answer: "Sim. Você pode acompanhar receitas, despesas e fluxo financeiro em um único lugar.",
  },
  {
    question: "Posso divulgar promoções?",
    answer: "Sim. As promoções aparecem para milhares de tutores dentro do aplicativo Bitzy.",
  },
  {
    question: "O Clube Bitzy gera novos clientes?",
    answer:
      "Sim. Os descontos oferecidos pelo seu estabelecimento ficam disponíveis para todos os usuários do aplicativo, aumentando sua visibilidade.",
  },
  {
    question: "Preciso instalar algum programa?",
    answer: "Não. O sistema funciona pela internet e pode ser acessado de qualquer computador ou celular.",
  },
  {
    question: "Posso acessar pelo celular?",
    answer: "Sim. Você pode utilizar o sistema em computadores, tablets e smartphones.",
  },
  {
    question: "Existe fidelização?",
    answer: "Você escolhe o plano que melhor atende sua empresa.",
  },
  {
    question: "O Bitzy serve apenas para pet shops?",
    answer:
      "Não. Também atende clínicas veterinárias, banho e tosa, hotéis, creches, adestradores e diversos prestadores de serviços pet.",
  },
  {
    question: "Como funciona a Inteligência Artificial?",
    answer:
      "Ela auxilia na gestão do negócio, gera sugestões, ajuda na comunicação com clientes e oferece insights para aumentar as vendas.",
  },
]

const faqFornecedores = [
  {
    question: "O que é o Marketplace B2B do Bitzy?",
    answer:
      "É um ambiente onde fornecedores anunciam produtos, lançamentos e promoções diretamente para milhares de pet shops parceiros.",
  },
  {
    question: "Quem pode vender?",
    answer: "Fabricantes, distribuidores, importadores e fornecedores do mercado pet.",
  },
  {
    question: "Como funciona?",
    answer: "Você cadastra seus produtos e promoções para que pet shops encontrem facilmente suas ofertas.",
  },
  {
    question: "Posso divulgar promoções?",
    answer: "Sim. Você pode criar campanhas promocionais exclusivas para os estabelecimentos cadastrados.",
  },
  {
    question: "O Marketplace cobra comissão?",
    answer: "Depende do plano contratado. Consulte nossa equipe comercial.",
  },
  {
    question: "Os pedidos são feitos dentro da plataforma?",
    answer:
      "Os pet shops podem visualizar seus produtos e entrar em contato diretamente com sua empresa para realizar pedidos. O Bitzy tem a ciência de quantos pets entraram em contato e acompanha a venda com os fornecedores.",
  },
  {
    question: "Posso divulgar lançamentos?",
    answer: "Sim. Você pode divulgar novos produtos para milhares de compradores em poucos minutos.",
  },
  {
    question: "Consigo alcançar pet shops do Brasil inteiro?",
    answer: "Sim. Sua empresa poderá ser encontrada por estabelecimentos de diversas regiões.",
  },
  {
    question: "Posso atualizar preços sempre que quiser?",
    answer: "Sim. As informações podem ser alteradas sempre que necessário.",
  },
  {
    question: "Como minha empresa aparece para os compradores?",
    answer:
      "Seu catálogo fica disponível dentro do Marketplace B2B, permitindo que os pet shops encontrem sua empresa por categoria, marca ou produto.",
  },
  {
    question: "Como começo a anunciar?",
    answer: "Basta realizar seu cadastro e escolher o plano mais adequado para sua empresa.",
  },
]

function FAQList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-fredoka text-3xl md:text-4xl font-semibold mb-3">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground">
            Tire suas dúvidas sobre o Bitzy — para tutores, pet shops e fornecedores.
          </p>
        </div>

        <Tabs defaultValue="tutores" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tutores">Tutores</TabsTrigger>
            <TabsTrigger value="pet-shops">Pet Shops</TabsTrigger>
            <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
          </TabsList>

          <TabsContent value="tutores">
            <FAQList items={faqTutores} />
          </TabsContent>
          <TabsContent value="pet-shops">
            <FAQList items={faqPetShops} />
          </TabsContent>
          <TabsContent value="fornecedores">
            <FAQList items={faqFornecedores} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}