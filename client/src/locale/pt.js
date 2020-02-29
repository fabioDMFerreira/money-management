import {
  ADD,
  AMOUNT,
  AUTHENTICATION,
  BALANCE,
  CLEAR_FILTERS,
  CREDIT,
  DASHBOARD,
  DASHBOARD_LOAD_SAMPLE_PRESENTATION,
  DASHBOARD_ONBOARDING_PRESENTATION,
  DASHBOARD_PRESENTATION,
  DASHBOARD_QUICK_ACTIONS_PRESENTATION,
  DASHBOARD_STATISTICS_PRESENTATION,
  DEBIT,
  DONE,
  EMAIL,
  ESTIMATED,
  ESTIMATES,
  FORECAST,
  FORECAST_PRESENTATION,
  GUIDE_TOUR_PRESENTATION,
  HOME,
  INCORRECT_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  LAST_TRANSACTIONS,
  LOAD_DATA_SAMPLE,
  LOAD_DATA_SAMPLE_CONFIRMATION_MESSAGE,
  LOADING,
  LOGIN,
  LOGOUT,
  MORE,
  NETWORK_500,
  NETWORK_ERROR,
  NETWORK_NOT_FOUND,
  NETWORK_UNSUPPORTED_MEDIA_TYPE,
  NEXT,
  NO,
  NO_RESULTS_FOUND,
  NO_TRANSACTIONS_FOUND,
  NO_WALLETS_FOUND,
  ORDER_BY,
  PASSWORD,
  PREVIOUS,
  PROFILE,
  QUICK_ACTIONS,
  REQUIRED,
  RULES,
  SELECT_OPTION,
  SKIP,
  START_GUIDE_TOUR,
  TAG_TRANSACTIONS,
  TAGS,
  TAGS_PRESENTATION,
  TIMELINE,
  TRANSACTIONS,
  TRANSACTIONS_PRESENTATION,
  USER_DOES_NOT_EXIST,
  WALLETS,
  WALLETS_PRESENTATION,
  YES,
} from './consts';

export default {
  [REQUIRED]: 'Obrigatório',
  [INVALID_EMAIL]: 'Email inválido',
  [INVALID_PASSWORD]: 'Palavra chave inválida',
  [USER_DOES_NOT_EXIST]: 'Utilizador não existe',
  [EMAIL]: 'Endereço email',
  [PASSWORD]: 'Palavra-chave',
  [LOGIN]: 'Autentique-se',
  [AUTHENTICATION]: 'Entrada',
  [HOME]: 'Home',
  [PROFILE]: 'Perfil',
  [SELECT_OPTION]: 'Selecione uma opção',
  [CLEAR_FILTERS]: 'Limpa os filtros',
  [LOADING]: 'A carregar...',
  [NO_RESULTS_FOUND]: 'Sem resultados',
  [INCORRECT_PASSWORD]: 'Password incorreta',
  [NETWORK_ERROR]: 'Problema de rede',
  [NETWORK_NOT_FOUND]: 'Sem resultados',
  [NETWORK_UNSUPPORTED_MEDIA_TYPE]: 'Media type não suportado',
  [NETWORK_500]: 'Erro ao fazer pedido',
  [ORDER_BY]: 'Ordenar por',
  [LOGOUT]: 'Sair',
  [GUIDE_TOUR_PRESENTATION]: `
		Bem vindo!
	`,
  [DASHBOARD_LOAD_SAMPLE_PRESENTATION]: 'Clica no botão para gerar dados aleatrórios. Começa a utilizar o produto.',
  [DASHBOARD_STATISTICS_PRESENTATION]: 'Mostra estatísticas dos dados da tua conta.',
  [DASHBOARD_ONBOARDING_PRESENTATION]: `
	Ações principais da plataforma.

	Depois de introduzir dados mais secções aparecerão nesta página.
	`,
  [DASHBOARD_PRESENTATION]: 'Vê um resumo do teu estado financeiro atual.',
  [WALLETS_PRESENTATION]: `
	Cria contas bancárias e consulta o saldo e os movimentos associados.
`,
  [TRANSACTIONS_PRESENTATION]: `
	Importa e gere movimentos.
`,
  [FORECAST_PRESENTATION]: `
	Planeia o futuro financeiro.
`,
  [TAGS_PRESENTATION]: `
	Cria categorias e consulta os movimentos associados.
`,
  [DASHBOARD_QUICK_ACTIONS_PRESENTATION]: `
	Ações que facilitam a utilização da plataforma.
`,
  [BALANCE]: 'Saldo',
  [TRANSACTIONS]: 'Movimentos',
  [ESTIMATES]: 'Estimativas',
  [WALLETS]: 'Contas Bancárias',
  [LAST_TRANSACTIONS]: 'Últimos Movimentos',
  [CREDIT]: 'Crédito',
  [DEBIT]: 'Débito',
  [QUICK_ACTIONS]: 'Ações Rápidas',
  [ADD]: 'Cria',
  [TAGS]: 'Categorias',
  [START_GUIDE_TOUR]: 'Tutorial',
  [LOAD_DATA_SAMPLE]: 'Carrega Amostra de Dados',
  [MORE]: 'Mais',
  [AMOUNT]: 'Montante',
  [ESTIMATED]: 'Estimado',
  [NO_WALLETS_FOUND]: 'Sem Contas Bancárias',
  [NO_TRANSACTIONS_FOUND]: 'Sem Movimentos',
  [LOAD_DATA_SAMPLE_CONFIRMATION_MESSAGE]: 'Todos os dados atuais vão ser substituídos por novos dados.',
  [YES]: 'Sim',
  [NO]: 'Não',
  [DASHBOARD]: 'Dashboard',
  [FORECAST]: 'Previsão',
  [TIMELINE]: 'Evolução',
  [NEXT]: 'Próximo',
  [PREVIOUS]: 'Anterior',
  [SKIP]: 'Saltar',
  [DONE]: 'Fim',
  [RULES]: 'Regras',
  [TAG_TRANSACTIONS]: 'Categorizar Movimentos',
};