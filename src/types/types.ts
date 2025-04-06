// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FileAnalysis {
    count_of_records: number;
    number_of_numerical_features: number;
    number_of_categorical_features: number;
    general_analysis: string;
    averages_per_numerical_feature: Record<string, number>;
    count_of_unique_fields_per_categorical_feature: Record<string, Record<string, number>>;
    data_analyst: DataAnalyst;
  }
  
  interface DataAnalyst {
    single_data_output: SingleDataOutput[];
    graph_data_output: GraphDataOutput[];
  }
  
  interface SingleDataOutput {
    label: string;
  }
  
  interface GraphDataOutput {
    Graph_type: string;
    title: string;
    x_labels: string[];
    multiple_dataset: boolean;
    dataset: DatasetEntry[];
  }
  
  interface DatasetEntry {
    label: string;
    data: number[];
  }
  