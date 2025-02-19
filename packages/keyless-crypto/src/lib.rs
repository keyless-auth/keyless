use expander_compiler::frontend::*;
use serde::Serialize;
use serde_wasm_bindgen::Serializer;
use wasm_bindgen::prelude::*;

declare_circuit!(Circuit {
    x: Variable,
    y: Variable,
});

impl Define<M31Config> for Circuit<Variable> {
    fn define(&self, builder: &mut API<M31Config>) {
        builder.assert_is_equal(self.x, self.y);
    }
}

#[test]
pub fn generate_zk_proof_wasm(x_val: u32, y_val: u32) -> Result<JsValue, JsError> {
    let compile_result = compile(&Circuit::default()).unwrap();

    let assignment = Circuit::<M31> {
        x: M31::from(x_val),
        y: M31::from(y_val),
    };

    let witness = compile_result
        .witness_solver
        .solve_witness(&assignment)
        .unwrap();

    let output = compile_result.layered_circuit.run(&witness);
    assert_eq!(output, vec![true]);

    // Serialize and write the circuit to a file
    let file = std::fs::File::create("circuit.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    compile_result
        .layered_circuit
        .serialize_into(writer)
        .unwrap();

    // Serialize and write the witness to a file
    let file = std::fs::File::create("witness.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer).unwrap();

    // Serialize and write the witness solver to a file
    let file = std::fs::File::create("witness_solver.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    compile_result
        .witness_solver
        .serialize_into(writer)
        .unwrap()
}
