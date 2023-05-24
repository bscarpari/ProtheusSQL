import React, { useState } from 'react'

import { VscChevronDown, VscChevronUp } from 'react-icons/vsc'

const RulesAccordion = () => {
  return (
    <>
      <AccordionItem title='Regra 1: Pesquise antes de postar'>
        Sempre pesquise o fórum antes de postar uma nova dúvida. É possível que
        alguém já tenha feito a mesma pergunta e você pode encontrar a resposta
        rapidamente sem ter que esperar por uma resposta.
      </AccordionItem>
      <AccordionItem title='Regra 2: Seja claro e específico'>
        Ao postar sua dúvida, seja claro e específico sobre o problema que está
        enfrentando. Inclua detalhes relevantes, como mensagens de erro, código
        relevante e etapas que você já tentou para resolver o problema.
      </AccordionItem>
      <AccordionItem title='Regra 3: Seja educado e respeitoso'>
        Respeite outros membros da comunidade e seja educado em suas interações.
        Não faça comentários ofensivos ou discriminatórios e evite comportamento
        inadequado.
      </AccordionItem>
    </>
  )
}

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='mb-4 rounded-lg border shadow'>
      <div
        className='flex cursor-pointer items-center justify-between p-4'
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className='text-lg font-medium'>{title}</h2>
        {isOpen ? (
          <VscChevronUp className='h-6 w-6 text-gray-400' />
        ) : (
          <VscChevronDown className='h-6 w-6 text-gray-400' />
        )}
      </div>
      {isOpen && <div className='my-1 mb-4 px-4 pb-4 text-sm'>{children}</div>}
    </div>
  )
}

export default RulesAccordion
